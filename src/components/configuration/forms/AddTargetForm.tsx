import React, { useState } from "react";

import { Controller } from "react-hook-form";

// @mui
import { SxProps, Theme } from "@mui/material";
import styled from "@emotion/styled";

// common component
import MagicAutoCompleteSelect from "../../common/MagicAutoCompleteSelect";

// mui components
import FormControlLabel from "../../mui/FormControlLabel";
import FormHelperText from "../../mui/FormHelperText";
import FormControl from "../../mui/FormControl";
import RadioGroup from "../../mui/RadioGroup";
import Typography from "../../mui/Typography";
import TextField from "../../mui/TextField";
import Radio from "../../mui/Radio";
import Stack from "../../mui/Stack";
import Tabs from "../../mui/Tabs";
import Tab from "../../mui/Tab";
import Box from "../../mui/Box";

const tabIndicatorStyles: SxProps<Theme> = {
  bgcolor: "rgb(89, 89, 89)",
  height: "2px",
};

const tabSx: SxProps<Theme> = {
  padding: "3px 7px",
  textTransform: "capitalize",
  fontSize: "13px",
  color: "#242424",
  "&.Mui-selected": {
    fontWeight: 700,
    color: "#242424",
    backgroundColor: "#FEF7DA",
  },
};

const AddTargetForm: React.FC<any> = (props) => {
  const { control } = props;

  const [activeTab, setActiveTab] = useState<number>(0);

  const programmePerformanceField = [
    {
      name: "createNewTargetFormData.programmePerformance.youthEnrolment",
      validationMsg: "Youth enrolment is required",
      label: "Youth Enrolment",
      id: "youthEnrolment",
    },
    {
      name: "createNewTargetFormData.programmePerformance.femaleEnrolment",
      validationMsg: "Female enrolment is required",
      label: "Female Enrolment",
      id: "femaleEnrolment",
    },
    {
      name: "createNewTargetFormData.programmePerformance.youthDropout",
      validationMsg: "Youth dropout is required",
      label: "Youth Dropout",
      id: "youthDropout",
    },
    {
      name: "createNewTargetFormData.programmePerformance.youthAttendance",
      validationMsg: "Youth attendance is required",
      label: "Youth Attendance",
      id: "youthAttendance",
    },
    {
      name: "createNewTargetFormData.programmePerformance.youthPlacement",
      validationMsg: "Youth placement is required",
      label: "Youth Placement",
      id: "youthPlacement",
    },
    {
      name: "createNewTargetFormData.programmePerformance.youthRetention",
      validationMsg: "Youth retention is required",
      label: "Youth Retention",
      id: "youthRetention",
    },
    {
      name: "createNewTargetFormData.programmePerformance.demandDrivenBatches",
      validationMsg: "Demand driven batches are required",
      label: "Demand Driven Batches",
      id: "demandDrivenBatches",
    },
  ];

  const qualityAndEfficacyField = [
    {
      name: "qualityAndEfficacy.finPerformanceUnderspent",
      validationMsg: "Performance underspent is required",
      heading: "OPERATIONS FINANCE",
      label: "Performance Underspent",
      id: "finPerformanceUnderspent",
    },
    {
      name: "qualityAndEfficacy.onboardStaff",
      validationMsg: "Onboard staff is required",
      heading: "OPERATIONS HR",
      label: "Onboard Staff",
      id: "onboardStaff",
    },
    {
      name: "qualityAndEfficacy.staffAttrition",
      validationMsg: "Staff attrition is required",
      heading: "",
      label: "Staff Attrition",
      id: "staffAttrition",
    },
    {
      name: "qualityAndEfficacy.infantAttrition",
      validationMsg: "Infant attrition is required",
      heading: "",
      label: "Infant Attrition",
      id: "infantAttrition",
    },
    {
      name: "qualityAndEfficacy.trainedStaff",
      validationMsg: "Trained staff is required",
      heading: "",
      label: "Trained Staff",
      id: "trainedStaff",
    },
    {
      name: "qualityAndEfficacy.centerOccupancyAsPerSessionPlanAndTimeSheet",
      validationMsg: "Center occupancy is required",
      heading: "GOVERNANCE AND ETHICS",
      label: "Center Occupancy",
      id: "centerOccupancyAsPerSessionPlanAndTimeSheet",
    },
    {
      name: "qualityAndEfficacy.youthAttendance",
      validationMsg: "Youth attendance is required",
      heading: "",
      label: "Youth Attendance",
      id: "youthAttendance",
    },
    {
      name: "qualityAndEfficacy.communicationWithFPD",
      validationMsg: "Communication with FPD is required",
      heading: "",
      label: "Communication with FPD",
      id: "communicationWithFPD",
    },
    {
      name: "qualityAndEfficacy.qualityDocumentation",
      validationMsg: "Quality documentation is required",
      heading: "",
      label: "Quality Documentation",
      id: "qualityDocumentation",
    },
    {
      name: "qualityAndEfficacy.knowledge",
      validationMsg: "Knowledge is required",
      heading: "SESSION QUALITY",
      label: "Knowledge",
      id: "knowledge",
    },
    {
      name: "qualityAndEfficacy.skill",
      validationMsg: "Skill is required",
      heading: "",
      label: "Skill",
      id: "skill",
    },
    {
      name: "qualityAndEfficacy.attitude",
      validationMsg: "Attitude is required",
      heading: "",
      label: "Attitude",
      id: "attitude",
    },
    {
      name: "qualityAndEfficacy.funderAuditScore",
      validationMsg: "Funder audit score is required",
      heading: "STAKEHOLDERS FEEDBACK",
      label: "Funder Audit Score",
      id: "funderAuditScore",
    },
    {
      name: "qualityAndEfficacy.youthFeedbackScore",
      validationMsg: "Youth feedback score is required",
      heading: "",
      label: "Youth Feedback Score",
      id: "youthFeedbackScore",
    },
    {
      name: "qualityAndEfficacy.staffProfessional",
      validationMsg: "Staff professional is required",
      heading: "",
      label: "Staff Professional",
      id: "staffProfessional",
    },
    {
      name: "qualityAndEfficacy.infrastructure",
      validationMsg: "Infrastructure is required",
      heading: "",
      label: "Infrastructure",
      id: "infrastructure",
    },
    {
      name: "qualityAndEfficacy.centerHygieneAndSafety",
      validationMsg: "Center hygiene and safety is required",
      heading: "",
      label: "Center Hygiene and Safety",
      id: "centerHygieneAndSafety",
    },
    {
      name: "qualityAndEfficacy.centerBranding",
      validationMsg: "Center branding is required",
      heading: "",
      label: "Center Branding",
      id: "centerBranding",
    },
  ];

  return (
    <div>
      <Stack sx={{ padding: "20px 20px 0px 20px" }}>
        <Controller
          name="createNewTargetFormData.center"
          control={control}
          rules={{ required: "Center is required" }}
          render={({ field, fieldState: { error } }) => (
            <StyledStack>
              <StyledTypography>Centre</StyledTypography>
              <FormControl error={!!error} fullWidth>
                <MagicAutoCompleteSelect
                  {...field}
                  options={["A", "B", "C", "D"]}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  value={field.value}
                  placeholder="Select state"
                />
                <StyledFormHelperText>
                  {error ? error.message : " "}
                </StyledFormHelperText>
              </FormControl>
            </StyledStack>
          )}
        />

        <Controller
          name="centreDetail.region"
          control={control}
          rules={{ required: "Region is required" }}
          render={({ field, fieldState: { error } }) => (
            <Box sx={{ mb: "20px" }}>
              <StyledTypography>Target duration</StyledTypography>
              <FormControl error={!!error} fullWidth>
                <RadioGroup
                  {...field}
                  aria-labelledby="region-radio-buttons-group-label"
                  name="region-radio-buttons-group"
                  value={field.value}
                  defaultValue="Quarterly"
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <StyledStack direction="row">
                    {["Quarterly", "Yearly"].map((radio: string) => (
                      <FormControlLabel
                        key={radio}
                        control={<Radio />}
                        label={radio}
                        value={radio}
                      />
                    ))}
                  </StyledStack>
                </RadioGroup>
                <StyledFormHelperText>
                  {" "}
                  {error ? error.message : " "}
                </StyledFormHelperText>
              </FormControl>
            </Box>
          )}
        />
      </Stack>

      {/* Tabs */}
      <Box sx={{ bgcolor: "rgb(255, 255, 255)", mb: "20px" }}>
        <Tabs
          value={activeTab}
          onChange={(event: React.SyntheticEvent, newValue: number) =>
            setActiveTab(newValue)
          }
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          sx={{ borderBottom: "1px solid rgb(222, 222, 227)" }}
          TabIndicatorProps={{
            sx: tabIndicatorStyles,
          }}
        >
          <Tab label="Programme performance" sx={tabSx} />
          <Tab label="Quality and efficacy" sx={tabSx} />
        </Tabs>
      </Box>

      {/* Programme Performance Field */}
      <Stack sx={{ display: activeTab ? "none" : "block", padding: "20px" }}>
        {programmePerformanceField.map(({ name, validationMsg, label, id }) => (
          <Controller
            key={id} // Unique key for each Controller
            name={name}
            control={control}
            rules={{
              required: validationMsg,
              validate: (value) =>
                /^-?\d+(\.\d{1,2})?$/.test(value) ||
                "Only numbers with up to two decimal places are allowed",
            }}
            render={({ field, fieldState: { error } }) => (
              <StyledStack>
                <StyledTypography>{label}</StyledTypography>
                <FormControl error={!!error} fullWidth>
                  <StyledTextField
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    id={id}
                    placeholder="Enter number"
                    size="small"
                  />
                  <StyledFormHelperText>
                    {error ? error.message : " "}
                  </StyledFormHelperText>
                </FormControl>
              </StyledStack>
            )}
          />
        ))}
      </Stack>

      {/* Quality And Efficacy Field */}
      <Stack
        sx={{ display: activeTab ? "block" : "none", padding: " 0px 20px" }}
      >
        {qualityAndEfficacyField.map(
          ({ name, validationMsg, label, id, heading }) => (
            <Controller
              key={id} // Unique key for each Controller
              name={name}
              control={control}
              rules={{
                required: validationMsg,
                validate: (value) =>
                  /^-?\d+(\.\d{1,2})?$/.test(value) ||
                  "Only numbers with up to two decimal places are allowed",
              }}
              render={({ field, fieldState: { error } }) => (
                <StyledStack>
                  <StyledHeading>{heading}</StyledHeading>
                  <StyledTypography>{label}</StyledTypography>
                  <FormControl error={!!error} fullWidth>
                    <StyledTextField
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      id={id}
                      placeholder="Enter number"
                      size="small"
                    />
                    <StyledFormHelperText>
                      {error ? error.message : " "}
                    </StyledFormHelperText>
                  </FormControl>
                </StyledStack>
              )}
            />
          )
        )}
      </Stack>
    </div>
  );
};

const StyledTypography = styled(Typography)(() => ({
  fontWeight: 500,
  color: "#242424",
  fontSize: "14px",
}));
const StyledFormHelperText = styled(FormHelperText)(() => ({
  marginLeft: "1px",
  marginBottom: "10px",
  marginTop: "-2px",
}));
const StyledStack = styled(Stack)(() => ({
  marginBottom: "-10px",
}));
const StyledTextField = styled(TextField)(() => ({}));
const StyledHeading = styled(Typography)(() => ({
  color: "#9E9E9E",
  fontWeight: 600,
  fontSize: "14px",
}));

export default AddTargetForm;
