import React, { useState } from "react";
import { ParameterType } from "../../store/types/configuration";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "../mui/Button";
import Stack from "../mui/Stack";
import Tab from "../mui/Tab";
import Tabs from "../mui/Tabs";
import { SxProps, Theme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  scoreTabs: ParameterType[];
  isLoadingScoreTabs: boolean;
  handleTabChange: (parameterTypeId: number) => void;
  handleAddParameterBtn: () => void
}

const tabIndicatorStyles: SxProps<Theme> = {
  bgcolor: "transparent",
  height: "0px",
};

const ScoreManagementTabs: React.FC<Props> = ({
  scoreTabs,
  isLoadingScoreTabs,
  handleTabChange,
  handleAddParameterBtn,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  if (isLoadingScoreTabs) {
    return <CircularProgress />;
  }

  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Tabs
        value={activeTab}
        onChange={(event: React.SyntheticEvent, newValue: number) =>
          setActiveTab(newValue)
        }
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        TabIndicatorProps={{
          sx: tabIndicatorStyles,
        }}
      >
        {scoreTabs.map((tab) => (
          <Tab
            key={tab.parameterTypeId}
            label={tab.parameterTypeName}
            onClick={() => handleTabChange(tab.parameterTypeId)}
            sx={{
              transition: "color 0.3s, background-color 0.3s",
              border: "1px solid #AFAFAF",
              textTransform: "capitalize",
              borderRadius: "20px",
              bgcolor: "#FFFFFF",
              color: "#AFAFAF",
              marginRight: "20px",
              fontWeight: 600,
              minHeight: "27px",
              maxHeight: "34px",
              height: "40px",

              "&.Mui-selected": {
                fontWeight: 700,
                color: "#242424",
                backgroundColor: "#FEF7DA",
              },
            }}
          />
        ))}
      </Tabs>

      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        size="small"
        onClick={handleAddParameterBtn}
        sx={{
          border: "1px solid #D0D5DD",
          bgcolor: "#FFFFFF",
          color: "#333333",
          maxHeight: "38px",
          fontWeight: 600,
          textTransform: "capitalize",
        }}
      >
        Add Parameter
      </Button>
    </Stack>
  );
};

export default ScoreManagementTabs;
