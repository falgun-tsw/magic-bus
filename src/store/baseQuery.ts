import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios, { AxiosHeaders } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { RootState, } from '../store'
import { clearUser, setUser } from '../store/slices/userSlice'
import { API_BASE_URL } from '../utils/constants';
import { toaster, showToast } from '../helper/toaster'


export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: "" }
    ): BaseQueryFn<{
        url: string;
        method: AxiosRequestConfig["method"];
        data?: AxiosRequestConfig["data"];
        params?: AxiosRequestConfig["params"];
    }> => async ({ url, method, data, params, }, { getState, dispatch }) => {

        try {
            const state = getState() as RootState;  // Explicitly type getState to RootState
            const { accessToken: token, refreshToken } = state.user;
            const exp = state.user.exp;

            const axiosHeaders = new AxiosHeaders() // Build headers using AxiosHeaders

            try {
                if (token && exp) {
                    // Check if the token is still valid
                    if (Date.now() < exp * 1000) {
                        axiosHeaders.set('Authorization', `Bearer ${token}`);
                    } else {
                        const { status, data } = await axios.post(`${API_BASE_URL}/user/refresh-access-token`, { refreshToken })
                        if (data?.success) {
                            dispatch(setUser(data?.data))
                        } else {
                            dispatch(clearUser());
                        }
                    }
                }
            } catch (e) {
                console.error("Error decoding token", e);
                dispatch(clearUser()); // Clear user if token can't be decoded
            }


            // Axios interceptors
            axios.interceptors.request.use(
                config => {
                    // You can also set headers or other configurations here if needed
                    return config
                },
                error => Promise.reject(error)
            )

            axios.interceptors.response.use(
                response => response, async error => {

                    const err = error as AxiosError
                    if (err.response?.status === 401) {
                        // Logout by dispatching clearUser action
                        dispatch(clearUser());
                        // toaster.error(errorMessage);
                    }

                    return Promise.reject(error)
                }
            )

            // Making the API request
            const result = await axios({
                url: baseUrl + url,
                method,
                data,
                params,
                headers: axiosHeaders // Use the AxiosHeaders object
            })

            return { data: result.data }

        } catch (axiosError) {
            console.log("axiosError", axiosError)
            const err = axiosError as AxiosError

            //@ts-ignore
            const errorMessage = err.response?.data?.message || err?.message || "Something went wrong!"
            if (typeof errorMessage === "string") {
                showToast(errorMessage, "error");
            }
 
            return {
                error: {
                    status: false,
                    data: errorMessage
                }
            }
        }
    }
