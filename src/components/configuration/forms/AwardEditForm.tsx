import React from "react";
import Typography from "../../mui/Typography";
import FormHelperText from "../../mui/FormHelperText";
import Stack from "../../mui/Stack";
import styled from "@emotion/styled";
import { Controller } from "react-hook-form";
import FormControl from "../../mui/FormControl";
import AutoCompleteSelect from "../../common/MagicAutoCompleteSelect";

interface Props {
  control: any;
  formState: { [key: string]: string | number | null } | any;
}

const AwardEditForm: React.FC<Props> = (props) => {
  const { control, formState } = props;
  return (
    <>
      <Controller
        name="editedDetails.LeaderBoardCount"
        control={control}
        rules={{ required: "Leader board count is required" }}
        render={({ field, fieldState: { error } }) => (
          <>
            <StyledTypography>Leader board count</StyledTypography>
            <FormControl error={!!error} fullWidth>
              <AutoCompleteSelect
                options={["A", "B", "C"]}
                onChange={(e:any) => {
                  field.onChange(e);
                }}
                value={formState.state}
                placeholder="Select leader board count"
              />
              <StyledFormHelperText>
                {error ? error.message : " "}
              </StyledFormHelperText>
            </FormControl>
          </>
        )}
      />

      <Stack>
        <StyledTypography>Points range</StyledTypography>
        <Stack direction={{ xs: "column", md: "row" }} gap="10px">
          <Controller
            name="editedDetails.PointsRange"
            control={control}
            rules={{ required: "Points range is required" }}
            render={({ field, fieldState: { error } }) => (
              <FormControl error={!!error} fullWidth>
                <AutoCompleteSelect
                  options={["A", "B", "C"]}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  value={formState.state}
                  placeholder="Select points range"
                />
                <StyledFormHelperText>
                  {error ? error.message : " "}
                </StyledFormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name="editedDetails.range"
            control={control}
            rules={{ required: "Equal to and more is required" }}
            render={({ field, fieldState: { error } }) => (
              <FormControl error={!!error} fullWidth>
                <AutoCompleteSelect
                  options={["A", "B", "C"]}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  value={formState.state}
                  placeholder="Equal to and more"
                />
                <StyledFormHelperText>
                  {error ? error.message : " "}
                </StyledFormHelperText>
              </FormControl>
            )}
          />
        </Stack>
      </Stack>
    </>
  );
};

const StyledTypography = styled(Typography)(() => ({}));
const StyledFormHelperText = styled(FormHelperText)(() => ({
  marginLeft: "0px",
}));


export default AwardEditForm;
