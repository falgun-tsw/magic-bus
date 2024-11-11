import React from "react";

// @mui component
import Box from "../components/mui/Box";

// container
import LoginContainer from "../containers/Login";

function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)", // Adjust gradient colors as needed
        background:
          "linear-gradient(180deg, rgba(243, 192, 8, 0.20) 0%, rgba(232, 84, 28, 0.20) 100%), #F9F9F9;",
      }}
    >
      <LoginContainer />
    </Box>
  );
}

export default LoginPage;
