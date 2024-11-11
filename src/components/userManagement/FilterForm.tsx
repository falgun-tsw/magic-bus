import { Controller } from "react-hook-form";

// @mui components
import FormControlLabel from "../mui/FormControlLabel";
import Typography from "../mui/Typography";
import FormGroup from "../mui/FormGroup";
import Checkbox from "../mui/Checkbox";
import Stack from "../mui/Stack";
import Box from "../mui/Box";
import AutoComplete from "../mui/AutoComplete";
import FormControl from "../mui/FormControl";

import { styled, SxProps, Theme } from "@mui/material/styles";
import FormHelperText from "../mui/FormHelperText";

interface CheckOption {
  label: string | number;
  value: string | number;
}
interface AddFilterFormProps {
  control: any;
  errors: any;
  role: CheckOption[];
  selectOption: any;
  program: any;
}

const StyledLabel = styled(Box)(({ theme }) => ({
  fontSize: "14px !important",
  marginBottom: "3px !important",
  fontWeight: "500 !important",
  color: "#191919 !important",
}));

const AddFilterForm: React.FC<AddFilterFormProps> = ({
  control,
  role = [],
  selectOption = [],
  program = [],
  errors,
}) => {
  return (
    <>
      <Controller
        name="filter.role"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Typography sx={{ marginBottom: "10px" }}>Role</Typography>
            <FormGroup>
              <Stack>
                {role.map((btn) => (
                  <FormControlLabel
                    {...field}
                    key={btn.value}
                    control={
                      <Checkbox
                        checked={field.value.includes(btn.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            // Add the value to the array if it's checked
                            field.onChange([...field.value, btn.value]);
                          } else {
                            // Remove the value from the array if it's unchecked
                            field.onChange(
                              field.value.filter(
                                (value: string) => value !== btn.value
                              )
                            );
                          }
                        }}
                        sx={{
                          "&.Mui-checked": {
                            color: "#FFCA09",
                          },
                        }}
                      />
                    }
                    label={btn.label}
                    value={btn.value}
                  />
                ))}
                <StyledFormHelperText>
                  {error ? error.message : " "}
                </StyledFormHelperText>
              </Stack>
            </FormGroup>
          </>
        )}
      />
      <Stack>
        <Controller
          name="filter.centers"
          control={control}
          // rules={{ required: "Centers is required" }}
          render={({ field, fieldState: { error } }) => {
            return (
              <>
                <Stack>
                  <StyledLabel>Centers</StyledLabel>
                  <FormControl error={!!errors.data?.centers} fullWidth>
                    <AutoComplete
                      {...field}
                      id="Centers-select"
                      options={selectOption}
                      matchKey="id"
                      labelKey="label"
                      placeholder="Select Centers"
                      disableClearable={false}
                      errorMsg={errors.data?.centers?.message}
                      loading={false}
                      multiple={true}
                      value={field.value || []}
                      onChange={(newValue: any) => {
                        field.onChange(newValue);
                      }}
                      sx={{ backgroundColor: "#fff" }}
                    />
                    <StyledFormHelperText>
                      {error ? error.message : " "}
                    </StyledFormHelperText>
                  </FormControl>
                </Stack>
              </>
            );
          }}
        />
      </Stack>
      <Stack>
        <Controller
          name="filter.programs"
          control={control}
          // rules={{ required: "programs is required" }}
          render={({ field, fieldState: { error } }) => {
            return (
              <>
                <Stack>
                  <StyledLabel>Programs</StyledLabel>
                  <FormControl error={!!errors.data?.programs} fullWidth>
                    <AutoComplete
                      {...field}
                      id="programs-select"
                      options={program}
                      matchKey="value"
                      labelKey="label"
                      placeholder="Select programs"
                      disableClearable={false}
                      errorMsg={errors.data?.programs?.message}
                      loading={false}
                      multiple={true}
                      value={field.value || []}
                      onChange={(newValue: any) => {
                        field.onChange(newValue);
                      }}
                      sx={{ backgroundColor: "#fff" }}
                    />
                    <StyledFormHelperText>
                      {error ? error.message : " "}
                    </StyledFormHelperText>
                  </FormControl>
                </Stack>
              </>
            );
          }}
        />
      </Stack>
    </>
  );
};

const StyledTypography = styled(Typography)(() => ({}));
const StyledFormHelperText = styled(FormHelperText)(() => ({
  marginLeft: "0px",
  color: "red",
}));

export default AddFilterForm;
