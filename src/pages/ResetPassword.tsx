import React, { useEffect } from "react";

// @mui component
import Box from "../components/mui/Box";

// container
import ResetPasswordContainer from "../containers/ResetPasswordContainer";

function ResetPassword() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(180deg, rgba(243, 192, 8, 0.20) 0%, rgba(232, 84, 28, 0.20) 100%), #F9F9F9;",
      }}
    >
      <ResetPasswordContainer />
    </Box>
  );
}


export default ResetPassword;
