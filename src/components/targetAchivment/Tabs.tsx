import React, { useState } from "react";

// @mui
import { SxProps, Theme } from "@mui/material";
import { styled } from "@mui/styles";

// @mui icon
import CircularProgress from "@mui/material/CircularProgress";

// mui component
import Tab from "../mui/Tab";
import Tabs from "../mui/Tabs";
import Stack from "../mui/Stack";

interface TabInterface {
  id: number;
  name: string;
}

interface Props {
  tabs: TabInterface[];
  isLoadingScoreTabs?: boolean;
  handleTabChange?: (parameterTypeId: number) => void;
}

const tabIndicatorStyles: SxProps<Theme> = {
  bgcolor: "transparent",
  height: "0px",
};

const TargetAchievementCategories: React.FC<Props> = (props) => {
  const { tabs, isLoadingScoreTabs, handleTabChange } = props;

  const [activeTab, setActiveTab] = useState<number>(0);
  if (isLoadingScoreTabs) {
    return <CircularProgress />;
  }

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        borderBottom: "1px solid #D0D0D0",
        mb:"20px",
      }}
    >
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
        {tabs.map((tab: TabInterface) => (
          <StyledTab
            key={tab.id}
            label={tab.name}
            onClick={() => {
              if (handleTabChange) handleTabChange(tab.id);
            }}
          />
        ))}
      </Tabs>
    </Stack>
  );
};

const StyledTab = styled(Tab)((them) => ({
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
}));

export default TargetAchievementCategories;
