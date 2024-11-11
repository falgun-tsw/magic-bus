import React, { useState, useEffect } from "react";

// @mui components
import Typography from "../mui/Typography";
import Button from "../mui/Button";

// common
import OtpField from "../common/OtpField";

interface VerifyOtpFormProps {
  email: string;
  onVerifyOtp: (email: string, otp: string) => void;
  isLoading: boolean;
  error: string | null;
}

const VerifyOtpForm: React.FC<VerifyOtpFormProps> = ({
  email,
  onVerifyOtp,
  isLoading,
}) => {
  const [otp, setOtp] = useState<string>("");
  const [isValidOtp, setIsValidOtp] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(30);
  const [isDisableResendOtpBtn, setIsDisableResendOtpBtn] =
    useState<boolean>(true);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsDisableResendOtpBtn(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const validateOtp = (otp: string) => {
    const isValid = /^\d{6}$/.test(otp);
    setIsValidOtp(isValid);
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    validateOtp(value);
  };

  const handleResendOtp = () => {
    console.log("Resend OTP to", email);
    setIsDisableResendOtpBtn(true);
    setSeconds(30);
  };

  const handleSubmit = () => {
    if (isValidOtp) {
      onVerifyOtp(email, otp);
    }
  };

  return (
    <div>
      <img
        src="assets/images/login/magic-bus-logo.svg"
        alt="Loading..."
        height="110px"
        width="110px"
        style={{ marginBottom: "33px" }}
      />

      <Typography sx={{ fontWeight: 700, fontSize: "30px", mt: "2px" }}>
        OTP Verification
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        gutterBottom
        sx={{ fontWeight: 400, fontSize: "14px", marginBottom: "30px" }}
      >
        We have sent OTP to <strong>{email}</strong>
      </Typography>

      <OtpField
        value={otp}
        onChange={handleOtpChange}
        length={6}
        isInvalidOtp={!isValidOtp && otp !== ""}
      />

      <Button
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        sx={{
          marginTop: "20px",
          backgroundColor: "#FEF7DA",
          color: "#000",
          textTransform: "capitalize",
        }}
        disabled={!isValidOtp || isLoading}
      >
        {isLoading ? "Verifying..." : "Confirm OTP"}
      </Button>

      <Button
        variant="text"
        fullWidth
        disabled={isDisableResendOtpBtn}
        onClick={handleResendOtp}
        sx={{
          marginTop: "20px",
          color: "#997906",
          textTransform: "capitalize",
        }}
      >
        Resend OTP in 00:{seconds}
      </Button>
    </div>
  );
};

export default VerifyOtpForm;
