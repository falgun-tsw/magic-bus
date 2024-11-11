import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#36A00F", // Green background when checked
      },
    },
    "&.Mui-unchecked": {
      "& + .MuiSwitch-track": {
        backgroundColor: "#DD5239", // Red background when unchecked
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    backgroundColor: theme.palette.mode === "dark" ? "#808080" : "#808080", // Default color
    boxSizing: "border-box",
  },
}));

interface OnOffButtonProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  opacity?: number;
  cursor?: string;
  onText: string;
  offText: string;
  disabled?: boolean;
}

const OnOffButton: React.FC<OnOffButtonProps> = ({
  checked,
  onChange,
  opacity = 1,
  cursor,
  onText,
  offText,
  disabled,
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <AntSwitch
        checked={checked}
        style={{ cursor: cursor }}
        onChange={onChange}
        inputProps={{ "aria-label": "ant design" }}
        disabled={disabled}
      />
    </Stack>
  );
};

export default OnOffButton;
