import React, { forwardRef, useState } from "react";

// @mui
import FormHelperText from "../mui/FormHelperText";
import LoadingButton from "../mui/LoadingButton";
import { Controller } from "react-hook-form";
import FormControl from "../mui/FormControl";
import Typography from "../mui/Typography";
import TextField from "../mui/TextField";
import Stack from "../mui/Stack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Box from "../mui/Box";

interface Props {
  control: any;
  errors: any;
  loading: boolean;
  handleSubmit: () => void;
}

const LoginForm: React.FC<Props> = forwardRef(({
  control,
  errors,
  handleSubmit,
  loading,
},ref:any) => {
  const [passwordShow, setPasswordShow] = useState(true);

  return (
    <>
      <Stack>
        <Stack>
          <img
            src="assets/images/login/magic-bus-logo.svg"
            alt="Loading..."
            height="80px"
            width="80px"
            style={{ marginBottom: "15px" }}
          />

          <Typography sx={{ fontWeight: 700, fontSize: "30px", mt: "2px" }}>
            Log in 👋
          </Typography>

          <Typography
            color="textSecondary"
            gutterBottom
            sx={{ fontWeight: 400, fontSize: "14px", marginBottom: "30px" }}
          >
            It's great to see you here, sign-in to begin your journey.
          </Typography>
        </Stack>
        <Stack sx={{ mb: "20px" }}>
          <Controller
            name="loginCredential.email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address format",
              },
            }}
            render={({ field }) => (
              <Box sx={{ mb: "10px" }}>
                <Typography>Email</Typography>
                <FormControl error={!!errors.loginCredential?.email} fullWidth>
                  <TextField
                    {...field}
                    ref={ref}
                    id="email"
                    placeholder="Enter email"
                    size="small"
                  />
                  <FormHelperText sx={{ marginLeft: "2px" }}>
                    {errors.loginCredential?.email?.message}
                  </FormHelperText>
                </FormControl>
              </Box>
            )}
          />

          <Controller
            name="loginCredential.password"
            control={control}
            rules={{
              required: "Password is required",
              // minLength: {
              //   value: 8,
              //   message: "Password must be at least 8 characters long",
              // },
              // pattern: {
              //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
              //   message:
              //     "Password must contain at least one letter, one number, and be 8 characters long",
              // },
            }}
            render={({ field }) => (
              <>
                <Typography>Password</Typography>
                <FormControl
                  error={!!errors.loginCredential?.password}
                  fullWidth
                >
                  <TextField
                    type={!passwordShow ? "text" : "password"}
                    {...field}
                    ref={ref}
                    id="password"
                    placeholder="Enter password"
                    size="small"
                  />
                  {passwordShow ? (
                    <VisibilityOffIcon
                      sx={{ position: "absolute", right: "6px", top: "8px" }}
                      onClick={() => setPasswordShow(false)}
                    />
                  ) : (
                    <VisibilityIcon
                      sx={{ position: "absolute", right: "6px", top: "8px" }}
                      onClick={() => setPasswordShow(true)}
                    />
                  )}
                  <FormHelperText sx={{ marginLeft: "2px" }}>
                    {errors.loginCredential?.password?.message}
                  </FormHelperText>
                </FormControl>
              </>
            )}
          />
        </Stack>

        <LoadingButton
          onClick={handleSubmit}
          variant="contained"
          sx={{
            textTransform: "capitalize",
            borderRadius: "8px",
            border: "1px solid #a18218",
            backgroundColor: "#fef7da",
            padding: "7px",
            "&:hover": {
              backgroundColor: "#FFF1B7",
            },
          }}
          loading={loading}
          loadingPosition="center"
        >
          {loading ? "Loading..." : "Log in"}
        </LoadingButton>
      </Stack>
    </>
  );
});

export default LoginForm;
