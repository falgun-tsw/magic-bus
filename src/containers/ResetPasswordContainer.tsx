import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Card from "../components/mui/Card";
import Box from "../components/mui/Box";
import ResetPassword from "../components/Login/ResetPassword";
import { useResetPasswordActionMutation } from "../store/apis/userApi";
import { DOMAIN } from "../utils/constants";
import { useNavigate, useSearchParams } from "react-router-dom";

interface ResetPassword {
  passwordCredential: {
    password: string;
    confirmPassword: string;
  };
}

const ResetPasswordContainer: React.FC = () => {
  const [resetPasswordAction, { data, isLoading }] =
    useResetPasswordActionMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  

  // Get reset token from the URL
  const resetToken = searchParams.get("token");
 
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPassword>({
    defaultValues: {
      passwordCredential: {
        password: "",
        confirmPassword: "",
      },
    },
  });

  // Handle form submission
  const handleResetPasswordSubmit: SubmitHandler<ResetPassword> = async (
    data
  ) => {
    const { password, confirmPassword } = data.passwordCredential;

    // If resetToken is missing, log the issue and return early
    if (!resetToken) {
      console.error("Missing reset token in the URL");
      return;
    }

    try {
      const res: any = await resetPasswordAction({
        password,
        confirmPassword,
        resetToken,
      });

      if (res?.data?.success) {
        console.log("Password reset successfully");
        handleRedirect(res.data.data);
      } else {
        console.error(
          "Password reset failed:",
          res?.error?.data || "Unknown error"
        );
      }
    } catch (err: any) {
      console.error("Error during password reset:", err.message || err);
    }
  };

  // Handle redirection based on portal type
  const handleRedirect = ({
    portalType,
    domain = DOMAIN.METAL_SCORE_CARD,
  }: {
    portalType: string;
    domain: string;
  }) => {
    window.location.href = domain;
  };

  return (
    <div>
      <Card
        sx={{ maxWidth: 450, padding: 2.5, borderRadius: 4, boxShadow: 14 }}
      >
        <Box sx={{ margin: 4, overflow: "hidden", boxSizing: "border-box" }}>
          <ResetPassword
            control={control}
            errors={errors}
            handleSubmit={handleSubmit(handleResetPasswordSubmit)}
            loading={isLoading}
          />
        </Box>
      </Card>
    </div>
  );
};

export default ResetPasswordContainer;
