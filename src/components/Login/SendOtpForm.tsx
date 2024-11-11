import React from "react";
import { useForm, Controller } from "react-hook-form";

// @mui
import TextField from "../mui/TextField";
import Button from "../mui/Button";
import Typography from "../mui/Typography";

interface SendOtpFormProps {
  onSendOtp: (email: string) => void;
  isLoading: boolean;
  error: string | null;
}

interface FormValues {
  email: string;
}

const SendOtpForm: React.FC<SendOtpFormProps> = ({
  onSendOtp,
  isLoading,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    onSendOtp(data.email);
  };

  return (
    <div>
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              masterLabel="Email Address"
              type="email"
              placeholder="Enter your email address"
              helperText={errors.email?.message}
              error={Boolean(errors.email)}
              fullWidth
              masterLabelSx={{
                marginBottom: "2px",
                fontWeight: 500,
                fontSize: "14px",
              }}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            marginTop: "20px",
            backgroundColor: "#FEF7DA",
            color: "#000",
            textTransform: "capitalize",
          }}
          disabled={!isValid || isLoading}
        >
          {isLoading ? "Sending..." : "Send OTP"}
        </Button>
      </form>
    </div>
  );
};

export default SendOtpForm;
