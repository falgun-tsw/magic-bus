import React from "react";

// components
import Button from "../mui/Button";
import Text from "../mui/Text";
import Stack from "../mui/Stack";
import Drawer from "../mui/Drawer";

// icons
import FilterListIcon from '@mui/icons-material/FilterList';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface MagicDrawerProps {
  title?: string;
  subtitle?: string;
  drawerOpen: boolean;
  onDrawerToggle: (open: boolean) => void;
  actionComponent?: () => React.ReactNode;
  children: React.ReactNode;
  sx?: object;
}

const MagicDrawer: React.FC<MagicDrawerProps> = ({
  title = "Title",
  subtitle = "subtitle",
  drawerOpen,
  onDrawerToggle,
  actionComponent,
  children,
  sx = {}
}) => {
  return (
    <>
      {/* Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => onDrawerToggle(false)}
        anchor="right"
      >
        <Stack sx={{ ...sx, width: "400px", height: "100%" }}>
          {/* Drawer Header*/}
          <Stack
            sx={{
              padding: "18px 16px",
              position: "relative",
              backgroundColor: "#4C4C4C",
              color: "#fff",
            }}
          >
            <Text component="h4" sx={{ fontWeight: "bold", marginBottom: "2px" }}>
              {title}
            </Text>
            <Text sx={{ marginBottom: "2px", fontSize: "14px" }}>
              {subtitle}
            </Text>
            <CancelOutlinedIcon
              sx={{
                color: "#fff",
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "22px",
                cursor: "pointer",
              }}
              onClick={() => onDrawerToggle(false)}
            />
          </Stack>

          {/* Drawer Body */}
          <Stack
            sx={{
              padding: "18px 16px",
              backgroundColor: "#f9f9f9",
              flex: 1,
              overflowY: "auto",
            }}
          >
            {children}
          </Stack>

          {/* Drawer Action Btn */}
          {actionComponent ? (
            <Stack
              sx={{
                flexFlow: "row nowrap",
                padding: "14px 16px",
                borderTop: "1px solid #e8e8e8",
                gap: "11px",
                "& button": {
                  flex: 1,
                  boxShadow: "none !important",
                  borderRadius: "7px",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontWeight: 500,
                },
                "& .bun-outline": {
                  border: "1px solid #8D8D8D",
                  backgroundColor: "#fff",
                  "&:hover": {
                    backgroundColor: "#ededed",
                  },
                },
                "& .bun-filled": {
                  border: "1px solid #a18218",
                  backgroundColor: "#fef7da",
                  "&:hover": {
                    backgroundColor: "#e8d78e",
                  },
                },
              }}
            >
              {actionComponent()}
            </Stack>
          ) : null}
        </Stack>
      </Drawer>
    </>
  );
};

export default MagicDrawer;
