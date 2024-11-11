// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import PrivateRoutes from "./routes/PrivateRoutes";
import { lightTheme } from "./utils/theme";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ResetPwdValidate from "./components/HOC/ResetPwdValidate";

function App() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <ToastContainer />
      <Router>
        <ResetPwdValidate>
          {user.isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
        </ResetPwdValidate>
      </Router>
    </ThemeProvider>
  );
}

export default App;
