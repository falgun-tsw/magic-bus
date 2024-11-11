import React, { ReactNode } from "react";
import MButton from "@mui/lab/LoadingButton";

interface ButtonProps {
  children?: ReactNode;
  title?: string;
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  loading?: boolean;
  onClick?: () => void;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  btnStyle?: object;
  [x: string]: any; // To allow additional props (like `sx` or `style`)
}

const Button: React.FC<ButtonProps> = ({
  children,
  title = "-",
  variant = "contained",  // "outlined", "text"
  size,
  color = "primary",
  loading = false,
  onClick = () => {
    console.log("clicked");
  },
  endIcon,
  startIcon,
  btnStyle ={},
  ...restProps
}) => {

  return (
    <MButton
      variant={variant}
      size={size}
      onClick={onClick}
      color={color}
      loading={loading}
      endIcon={endIcon}
      startIcon={startIcon}
      style={{...btnStyle}}
      {...restProps}
    >
      {children || title}
    </MButton>
  );
};

export default React.memo(Button);
