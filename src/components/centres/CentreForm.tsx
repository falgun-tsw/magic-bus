import React from "react";
import { Controller } from "react-hook-form";

// @mui components
import FormControlLabel from "../mui/FormControlLabel";
import FormHelperText from "../mui/FormHelperText";
import FormControl from "../mui/FormControl";
import RadioGroup from "../mui/RadioGroup";
import Typography from "../mui/Typography";
import TextFieldNew from "../mui/TextField_new";
import Radio from "../mui/Radio";
import Stack from "../mui/Stack";
import Box from "../mui/Box";
import AutoComplete from "../mui/AutoComplete";
//common
import styled from "@emotion/styled";

interface Options {
  label: string;
  id: number | string | boolean;
}

interface AddCentreFormProps {
  centerFormStates: any;
  control: any;
  errors?: any;
  centerList: { centerSelect: Options[]; centerTypeSelect: string[] };
  districtLevelManager: Options[];
  regionalDataManager: Options[];
  regionalDirector: Options[];
  programSubTypes: Options[];
  clusterManager: Options[];
  placementHead: Options[];
  programTypes: Options[];
  cityManager: Options[];
  mcpCentre: Options[];
  nationalSrDirector: Options[];
  regions: Options[];
  funder: Options[];
  centerManager: Options[];
  states: Options[];
  cities: string[];
  isLoadingRegionalDataManager: boolean;
  isLoadingRegionalDirector: boolean;
  isLoadingDisLevelManager: boolean;
  isLoadingClusterManager: boolean;
  isLoadingPlacementHead: boolean;
  isLoadingCityManger: boolean;
  handleStateSelect: (state: string | any) => void;
  handleDistrictSelect: (district: string) => void;
  biometricData?: any;
}

const StyledLabel = styled(Box)(({ theme }) => ({
  fontSize: "14px !important",
  marginBottom: "3px !important",
  fontWeight: "500 !important",
  color: "#191919 !important",
}));

const Status = [
  { id: "1", label: "Active" },
  { id: "2", label: "Inactive" },
];
const CentreForm: React.FC<AddCentreFormProps> = (props) => {
  const {
    control,
    errors,
    districtLevelManager = [],
    regionalDataManager = [],
    regionalDirector = [],
    programSubTypes = [],
    clusterManager = [],
    placementHead = [],
    programTypes = [],
    cityManager = [],
    mcpCentre = [],
    nationalSrDirector = [],
    centerManager = [],

    regions = [],
    funder = [],
    states = [],
    cities = [],
    isLoadingRegionalDataManager,
    isLoadingRegionalDirector,
    isLoadingDisLevelManager,
    isLoadingClusterManager,
    isLoadingPlacementHead,
    isLoadingCityManger,
    centerFormStates = {},
    centerList = {},
    handleStateSelect,
    biometricData = [],
  } = props;

  const biometricCentersValues = biometricData?.centreDetail?.biometricCenters;
  return (
    <Stack direction="column">
      <Stack>
        <Controller
          name="centreDetail.centerName"
          control={control}
          rules={{
            required: "Center name is required",
          }}
          render={({ field }) => (
            <>
              <StyledLabel>Centre Name</StyledLabel>
              <FormControl error={!!errors.centreDetail?.centerName} fullWidth>
                <TextFieldNew
                  {...field}
                  id="center-name"
                  placeholder="Enter center name"
                  helperText={errors.centreDetail?.centerName?.message}
                  error={!!errors.centreDetail?.centerName}
                  type="text"
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      <Controller
        name="centreDetail.region"
        control={control}
        rules={{ required: "Region is required" }}
        render={({ field }) => (
          <>
            <StyledTypography>Region</StyledTypography>
            <FormControl error={!!errors.centreDetail?.region} fullWidth>
              <RadioGroup
                {...field}
                aria-labelledby="region-radio-buttons-group-label"
                name="region-radio-buttons-group"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              >
                <Stack direction="row">
                  {regions.map((btn: any) => (
                    <FormControlLabel
                      key={btn.value}
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: "#FFCA09",
                            },
                          }}
                        />
                      }
                      label={btn.label}
                      value={btn.id}
                    />
                  ))}
                </Stack>
              </RadioGroup>
              <StyledFormHelperText sx={{ margin: 0 }}>
                {errors.centreDetail?.region?.message}
              </StyledFormHelperText>
            </FormControl>
          </>
        )}
      />

      <Stack>
        {biometricCentersValues?.length > 0 ? (
          biometricCentersValues?.map((item: any, index: number) => (
            <Controller
              key={item.id}
              name={`centreDetail.biometricCenters.[${index}].biometricDeviceId`}
              control={control}
              defaultValue={item.biometricDeviceId}
              rules={{ required: "Biometric device id is required" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <StyledLabel>Biometric Device ID</StyledLabel>
                  {console.log({ field }, "hello")}

                  <FormControl error={!!error} fullWidth>
                    <TextFieldNew
                      {...field}
                      placeholder={`Enter ID for Device ${item.id}`}
                      helperText={error ? error.message : ""}
                      error={!!error}
                      value={field.value || item.biometricDeviceId || ""}
                      type="text"
                    />
                  </FormControl>
                </>
              )}
            />
          ))
        ) : (
          <Controller
            name={`centreDetail.biometricCenters`}
            control={control}
            rules={{ required: "Biometric device id is required" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <StyledLabel>Biometric Device ID</StyledLabel>
                {console.log({ field }, "hi")}
                {console.log("biometricCentersValues", biometricCentersValues)}
                <FormControl error={!!error} fullWidth>
                  <TextFieldNew
                    {...field}
                    placeholder={`Enter ID for Device`}
                    helperText={error ? error.message : ""}
                    error={!!error}
                    value={field.value || ""}
                    type="text"
                  />
                </FormControl>
              </>
            )}
          />
        )}
      </Stack>

      <Controller
        name="centreDetail.isActive"
        control={control}
        rules={{ required: "Status is required" }}
        render={({ field }) => (
          <>
            <StyledTypography>Status</StyledTypography>
            <FormControl error={!!errors.centreDetail?.isActive} fullWidth>
              <RadioGroup
                {...field}
                aria-labelledby="region-radio-buttons-group-label"
                name="region-radio-buttons-group"
                value={field.value}
                defaultChecked={true}
                onChange={(e) => field.onChange(e.target.value)}
              >
                <Stack direction="row">
                  {Status.map((btn: any) => (
                    <FormControlLabel
                      key={btn.value}
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: "#FFCA09",
                            },
                          }}
                        />
                      }
                      label={btn.label}
                      value={btn.id}
                    />
                  ))}
                </Stack>
              </RadioGroup>
              <StyledFormHelperText sx={{ margin: 0 }}>
                {errors.centreDetail?.isActive?.message}
              </StyledFormHelperText>
            </FormControl>
          </>
        )}
      />

      <Stack mb="18px">
        <Controller
          name="centreDetail.funderId"
          control={control}
          rules={{ required: "Funder is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledLabel>Funder</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <AutoComplete
                  {...field}
                  id="funder-select"
                  options={funder}
                  matchKey="id"
                  labelKey="label"
                  placeholder="Select funder"
                  disableClearable={false}
                  onChange={(value) => field.onChange(value)} // Ensure value is set correctly
                  errorMsg={error?.message} // Pass the error message to AutoComplete
                  loading={false}
                  sx={{ backgroundColor: "#fff" }}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      <Stack>
        <Controller
          name="centreDetail.district"
          control={control}
          rules={{ required: "District is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledLabel>District</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <TextFieldNew
                  {...field}
                  id="district-select"
                  placeholder="Enter district"
                  helperText={errors.centreDetail?.district?.message}
                  error={!!errors.centreDetail?.district}
                  type="text"
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      <Stack mb="18px">
        <Controller
          name="centreDetail.state"
          control={control}
          rules={{ required: "State is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledLabel>State</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <AutoComplete
                  {...field}
                  id="state-select"
                  options={states}
                  matchKey="id"
                  labelKey="label"
                  placeholder="Select state"
                  disableClearable={false}
                  // Ensure the value is an object with label and id, even if it's just one selection
                  value={
                    field.value
                      ? {
                          label: field.value,
                          id: states.find(
                            (state) => state.label === field.value
                          )?.id,
                        }
                      : null
                  }
                  // Ensure value is updated correctly
                  onChange={(value) =>
                    field.onChange(value ? value.label : null)
                  } // Send only label
                  errorMsg={error?.message} // Pass the error message to AutoComplete
                  loading={false}
                  sx={{ backgroundColor: "#fff" }}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      <Stack>
        <Controller
          name="centreDetail.city"
          control={control}
          rules={{ required: "City is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledLabel>City</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <TextFieldNew
                  {...field}
                  id="city"
                  placeholder="Enter City"
                  helperText={errors.centreDetail?.city?.message}
                  error={!!errors.centreDetail?.city}
                  type="text"
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      <Stack>
        <Controller
          name="centreDetail.genderType"
          control={control}
          rules={{ required: "Gender Type is required" }}
          render={({ field, fieldState: { error } }) => (
            <Stack sx={{ marginBottom: "-5px" }}>
              <StyledLabel>Gender Type</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <TextFieldNew
                  {...field}
                  id="gender-type-select"
                  placeholder="Enter gender type"
                  helperText={errors.centreDetail?.genderType?.message}
                  error={!!errors.centreDetail?.genderType}
                  type="text"
                />
              </FormControl>
            </Stack>
          )}
        />
      </Stack>

      <Stack>
        <Controller
          name="centreDetail.centerBusinessType"
          control={control}
          rules={{ required: "Center business Type is required" }}
          render={({ field, fieldState: { error } }) => (
            <Stack sx={{ marginBottom: "-5px" }}>
              <StyledLabel>Centre Business Type</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <TextFieldNew
                  {...field}
                  id="center-business-type-select"
                  placeholder="Enter center business type"
                  helperText={errors.centreDetail?.centerBusinessType?.message}
                  error={!!errors.centreDetail?.centerBusinessType}
                  type="text"
                />
              </FormControl>
            </Stack>
          )}
        />
      </Stack>

      <Stack mb="18px">
        <Controller
          name="centreDetail.centerStatus"
          control={control}
          rules={{ required: "Physical/Virtual Status is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Stack sx={{ marginBottom: "-5px" }}>
                <StyledLabel>Centre Status</StyledLabel>
                <FormControl error={!!error} fullWidth>
                  <TextFieldNew
                    {...field}
                    id="centerStatus"
                    placeholder="Enter center status"
                    helperText={errors.centreDetail?.centerStatus?.message}
                    error={!!errors.centreDetail?.centerStatus}
                    type="text"
                  />
                </FormControl>
              </Stack>
            </>
          )}
        />
      </Stack>

      <Stack mb="18px">
        <Controller
          name="centreDetail.programType"
          control={control}
          rules={{ required: "Programme type is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledLabel>Programme Type</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <AutoComplete
                  {...field}
                  id="program-type-select"
                  options={programTypes}
                  matchKey="id"
                  labelKey="label"
                  placeholder="Select program type"
                  disableClearable={false}
                  onChange={(value) => field.onChange(value)} // Ensure value is set correctly
                  errorMsg={error?.message} // Pass the error message to AutoComplete
                  loading={false}
                  sx={{ backgroundColor: "#fff" }}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      <Stack mb="18px">
        <Controller
          name="centreDetail.mcpCenter"
          control={control}
          rules={{ required: "MCP center is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledLabel>MCP Center</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <AutoComplete
                  {...field}
                  id="mcp-center-select"
                  options={[
                    { id: true, label: "Yes" },
                    { id: false, label: "No" },
                  ]}
                  matchKey="id"
                  labelKey="label"
                  placeholder="Select MCP Center"
                  disableClearable={false}
                  value={field.value !== undefined ? field.value : null}
                  onChange={(value) => field.onChange(value)} // Ensure value is set correctly
                  errorMsg={error?.message} // Pass the error message to AutoComplete
                  loading={false}
                  sx={{ backgroundColor: "#fff" }}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      <Stack mb="18px">
        <Controller
          name="centreDetail.nationalSrDirector"
          control={control}
          rules={{ required: "National Sr. Director is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledLabel>National Sr. Director</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <AutoComplete
                  {...field}
                  id="national-sr-director-select"
                  options={nationalSrDirector}
                  matchKey="id"
                  labelKey="label"
                  placeholder="Select National Sr. Director"
                  disableClearable={false}
                  multiple={true}
                  // Ensure that field.value is always treated as an array (even if it's a single object).
                  value={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                      ? [field.value]
                      : []
                  }
                  onChange={(value) => field.onChange(value)} // Ensure value is set correctly
                  errorMsg={error?.message} // Pass the error message to AutoComplete
                  loading={false} // Set loading state to false as per your code
                  sx={{ backgroundColor: "#fff" }}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      <Stack mb="18px">
        <Controller
          name="centreDetail.districtLevelManager"
          control={control}
          rules={{ required: "District Level Manager is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledLabel>District Level Manager</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <AutoComplete
                  {...field}
                  id="districtLevelManager"
                  options={districtLevelManager}
                  matchKey="id"
                  labelKey="label"
                  placeholder="Select District Level Manager"
                  multiple={true}
                  // Ensure that field.value is always an array (even if it's a single object).
                  value={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                      ? [field.value]
                      : []
                  }
                  onChange={(value) => field.onChange(value)} // Ensure value is set correctly
                  errorMsg={error?.message} // Pass the error message to AutoComplete
                  loading={false} // Set loading state to false as per your code
                  sx={{ backgroundColor: "#fff" }}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      <Stack mb="18px">
        <Controller
          name="centreDetail.regionalDirector"
          control={control}
          rules={{ required: "Regional Director is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledLabel>Regional Director</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <AutoComplete
                  {...field}
                  id="regional-director-select"
                  options={regionalDirector}
                  matchKey="id"
                  labelKey="label"
                  placeholder="Select regional director"
                  multiple={true}
                  // Ensure that field.value is always an array, even if it's a single object.
                  value={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                      ? [field.value]
                      : []
                  }
                  disableClearable={false}
                  loading={isLoadingRegionalDirector}
                  onChange={(value) => field.onChange(value)} // Ensure value is set correctly
                  errorMsg={error?.message} // Pass the error message to AutoComplete
                  sx={{ backgroundColor: "#fff" }}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      <Stack mb="18px">
        <Controller
          name="centreDetail.cityManager"
          control={control}
          rules={{ required: "City Manager is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledLabel>City Manager</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <AutoComplete
                  {...field}
                  id="city-manager-select"
                  options={cityManager}
                  matchKey="id"
                  labelKey="label"
                  placeholder="Select city manager"
                  multiple={true}
                  // Ensure that field.value is always an array, even if it's a single object.
                  value={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                      ? [field.value]
                      : []
                  }
                  disableClearable={false}
                  loading={isLoadingCityManger}
                  onChange={(value) => field.onChange(value)} // Ensure value is set correctly
                  errorMsg={error?.message} // Pass the error message to AutoComplete
                  sx={{ backgroundColor: "#fff" }}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      <Stack mb="18px">
        <Controller
          name="centreDetail.centerManager"
          control={control}
          rules={{ required: "City Manager is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledLabel>Centre Manager</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <AutoComplete
                  {...field}
                  id="city-manager-select"
                  options={centerManager}
                  matchKey="id"
                  labelKey="label"
                  placeholder="Select center manager"
                  multiple={true}
                  // Ensure that field.value is always an array, even if it's a single object.
                  value={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                      ? [field.value]
                      : []
                  }
                  disableClearable={false}
                  loading={isLoadingCityManger}
                  onChange={(value) => field.onChange(value)} // Ensure value is set correctly
                  errorMsg={error?.message} // Pass the error message to AutoComplete
                  sx={{ backgroundColor: "#fff" }}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      <Stack mb="18px">
        <Controller
          name="centreDetail.clusterManager"
          control={control}
          rules={{ required: "Cluster Manager is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledLabel>Cluster Manager</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <AutoComplete
                  {...field}
                  id="cluster-manager-select"
                  options={clusterManager}
                  matchKey="id"
                  labelKey="label"
                  placeholder="Select cluster manager"
                  multiple={true}
                  // Ensure that field.value is always treated as an array, even for single selections.
                  value={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                      ? [field.value]
                      : []
                  }
                  disableClearable={false}
                  loading={isLoadingClusterManager}
                  onChange={(value) => field.onChange(value)} // Ensure value is set correctly
                  errorMsg={error?.message} // Pass the error message to AutoComplete
                  sx={{ backgroundColor: "#fff" }}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      <Stack mb="18px">
        <Controller
          name="centreDetail.placementHead"
          control={control}
          rules={{ required: "CRM/SPOC is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledLabel>CRM/SPOC</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <AutoComplete
                  {...field}
                  id="crm-spoc-select"
                  options={placementHead}
                  matchKey="id"
                  labelKey="label"
                  placeholder="Select CRM/SPOC"
                  multiple={true}
                  // Ensure that field.value is always treated as an array.
                  value={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                      ? [field.value]
                      : []
                  }
                  disableClearable={false}
                  loading={isLoadingClusterManager}
                  onChange={(value) => field.onChange(value)} // Ensure value is set correctly
                  errorMsg={error?.message} // Pass the error message to AutoComplete
                  sx={{ backgroundColor: "#fff" }}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      <Stack mb="18px">
        <Controller
          name="centreDetail.regionalDataManager"
          control={control}
          rules={{ required: "Regional Data Manager is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <StyledLabel>Regional Data Manager</StyledLabel>
              <FormControl error={!!error} fullWidth>
                <AutoComplete
                  {...field} // This could be the problematic spread operator.
                  id="regional-data-manager-select"
                  options={regionalDataManager}
                  matchKey="id"
                  labelKey="label"
                  placeholder="Select regional data manager"
                  disableClearable={false}
                  multiple={true}
                  value={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                      ? [field.value]
                      : []
                  }
                  loading={isLoadingRegionalDataManager}
                  onChange={(value) => field.onChange(value)}
                  errorMsg={error?.message} // Potential problematic syntax if error handling is wrong
                  sx={{ backgroundColor: "#fff" }}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>
    </Stack>
  );
};

const StyledTypography = styled(Typography)(() => ({}));
const StyledFormHelperText = styled(FormHelperText)(() => ({}));
const StyledStack = styled(Stack)(() => ({
  // marginBottom: "15px",
}));

export default CentreForm;
