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

const ResetPassword: React.FC<Props> = forwardRef(
  ({ control, errors, handleSubmit, loading }, ref: any) => {
    const [passwordShow, setPasswordShow] = useState(true);

    return (
      <Stack>
        <Stack>
          <Typography sx={{ fontWeight: 700, fontSize: "30px", mt: "2px" }}>
            Reset Password
          </Typography>

          <Typography
            color="textSecondary"
            gutterBottom
            sx={{ fontWeight: 400, fontSize: "14px", marginBottom: "30px" }}
          >
            It's great to see you here, Reset your Password and journey begin.
          </Typography>
        </Stack>
        <Stack sx={{ mb: "20px" }}>
          <Controller
            name="passwordCredential.password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain at least one letter, one number, and be 8 characters long",
              },
            }}
            render={({ field }) => (
              <>
                <Typography>Password</Typography>
                <FormControl
                  error={!!errors.passwordCredential?.password}
                  fullWidth
                >
                  <Box sx={{ position: "relative" }}>
                    <TextField
                      type={!passwordShow ? "text" : "password"}
                      {...field}
                      ref={ref}
                      id="password"
                      placeholder="Enter password"
                      size="small"
                      fullWidth
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
                  </Box>
                  <FormHelperText
                    sx={{ marginLeft: "2px", marginBottom: "20px" }}
                  >
                    {errors.passwordCredential?.password?.message}
                  </FormHelperText>
                </FormControl>
              </>
            )}
          />

          <Controller
            name="passwordCredential.confirmPassword"
            control={control}
            rules={{
              required: "Confirm Password is required",
              validate: (value) => {
                const { password } = control._formValues.passwordCredential;
                return value === password || "Passwords must match";
              },
            }}
            render={({ field }) => (
              <>
                <Typography>Confirm Password</Typography>
                <FormControl
                  error={!!errors.passwordCredential?.confirmPassword}
                  fullWidth
                >
                  <TextField
                    type="password"
                    {...field}
                    ref={ref}
                    id="confirmPassword"
                    placeholder="Re-enter password"
                    size="small"
                  />
                  <FormHelperText sx={{ marginLeft: "2px" }}>
                    {errors.passwordCredential?.confirmPassword?.message}
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
          {loading ? "Loading" : "Change Password"}
        </LoadingButton>
      </Stack>
    );
  }
);

export default ResetPassword;
