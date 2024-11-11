import React from "react";

import dayjs from "dayjs";
import styled from "@emotion/styled";

// common component
import AutoCompleteSelect from "../common/MagicAutoCompleteSelect";

// @mui components
import LocalizationProvider from "../mui/LocalizationProvider";
import FormControlLabel from "../mui/FormControlLabel";
import Typography from "../mui/Typography";
import DatePicker from "../mui/DatePicker";
import Checkbox from "../mui/Checkbox";
import MenuItem from "../mui/MenuItem";
import TextFieldNew from "../mui/TextField_new";
import Select from "../mui/Select";
import Stack from "../mui/Stack";
import AutoComplete from "../mui/AutoComplete";

interface SelectOption {
  label: string;
  id?: string | number | boolean;
}
interface Options {
  label: string;
  id: number | string | boolean;
}
interface CenterList {
  centerSelect: SelectOption[];
  centerTypeSelect: SelectOption[];
  citySelect: SelectOption[];
  districtSelect: SelectOption[];
  stateSelect: SelectOption[];
}

interface AddFilterFormProps {
  filter: { [key: string]: any };

  districtLevelManager: SelectOption[];
  regionalDataManager: SelectOption[];
  regionalDirector: SelectOption[];
  programSubTypes: SelectOption[];
  clusterManager: SelectOption[];
  placementHead: SelectOption[];
  programTypes: SelectOption[];
  cityManager: SelectOption[];
  mcpCentre: SelectOption[];
  regions: SelectOption[];
  funder: SelectOption[];
  centerManager: SelectOption[];
  states: Options[];

  isLoadingRegionalDataManager: boolean;
  isLoadingRegionalDirector: boolean;
  isLoadingDisLevelManager: boolean;
  isLoadingClusterManager: boolean;
  isLoadingPlacementHead: boolean;
  isLoadingCityManger: boolean;

  centerList: CenterList;

  handleFilterRegionSelect: (value: string) => void;
  handleFilterFormChange: (name: string, value: number | string) => void;
}

const Status = [
  { id: true, label: "Active" },
  { id: false, label: "Inactive" },
];
const FilterForm: React.FC<AddFilterFormProps> = ({
  districtLevelManager = [],
  regionalDataManager = [],
  programSubTypes = [],
  regionalDirector = [],
  programTypes = [],
  states = [],

  clusterManager = [],
  placementHead = [],
  cityManager = [],
  mcpCentre = [],
  regions = [],
  funder = [],
  centerManager = [],

  filter = {},
  centerList = {},

  handleFilterFormChange,
  handleFilterRegionSelect,
}) => {
  const statusFilter = filter.status || [];

  return (
    <Stack>
      <StyledStack>
        <Typography>Region</Typography>
        <Stack direction="row">
          {regions.map((btn: any) => (
            <FormControlLabel
              key={btn.id}
              control={
                <Checkbox
                  sx={{
                    fontSize: "10px",
                    "& .MuiSvgIcon-root": {
                      color: "#828282 !important",
                    },
                    "&.Mui-checked .MuiSvgIcon-root": {
                      color: "#FFCA09 !important", // Change color when checked
                    },
                  }}
                  checked={filter.region.includes(btn.id)}
                  onChange={() => handleFilterRegionSelect(btn.id)} // Pass value to handler
                />
              }
              label={btn.label}
              value={btn.id}
            />
          ))}
        </Stack>
      </StyledStack>

      <StyledStack>
        <Typography>Status</Typography>
        <Stack direction="row">
          {Status.map((btn: any) => (
            <FormControlLabel
              key={btn.id}
              control={
                <Checkbox
                  sx={{
                    fontSize: "10px",
                    "& .MuiSvgIcon-root": {
                      color: "#828282 !important",
                    },
                    "&.Mui-checked .MuiSvgIcon-root": {
                      color: "#FFCA09 !important", // Change color when checked
                    },
                  }}
                  checked={statusFilter.includes(btn.id)}
                  onChange={() => {
                    const newStatus = statusFilter.includes(btn.id)
                      ? statusFilter.filter(
                          (statusId: string) => statusId !== btn.id
                        ) // Deselect
                      : [btn.id]; // Select
                    handleFilterFormChange("status", newStatus); // Pass updated status array to handler
                  }}
                />
              }
              label={btn.label}
              value={btn.id}
            />
          ))}
        </Stack>
      </StyledStack>

      <StyledStack>
        <Typography>Centre</Typography>

        <AutoComplete
          sx={{ background: "#fff" }}
          // {...field}
          id="role-select"
          options={centerList.centerSelect}
          matchKey="id"
          labelKey="label"
          onChange={(e) => handleFilterFormChange("centerId", e)}
          value={filter.centerId}
          placeholder="Select center"
          disableClearable={false}
        />
      </StyledStack>

      <StyledStack>
        <Typography>District</Typography>
        <TextFieldNew
          // {...field}
          id="role-select"
          placeholder="Enter district"
          // helperText={errors.centreDetail?.district?.message}
          // error={!!errors.centreDetail?.district}
          type="text"
        />
      </StyledStack>

      <StyledStack>
        <Typography>State</Typography>

        <AutoComplete
          sx={{ background: "#fff" }}
          // {...field}
          id="role-select"
          options={states}
          matchKey="id"
          labelKey="label"
          onChange={(e) => handleFilterFormChange("state", e)}
          value={filter.state}
          placeholder="Select state"
          disableClearable={false}
        />
      </StyledStack>

      <StyledStack>
        <Typography>Gender type</Typography>

        <TextFieldNew
          // {...field}
          id="role-select"
          placeholder="Enter gender type"
          // helperText={errors.centreDetail?.district?.message}
          // error={!!errors.centreDetail?.district}
          type="text"
        />
      </StyledStack>

      <StyledStack>
        <Typography>Centre business type</Typography>

        <TextFieldNew
          // {...field}
          id="center-business-type"
          placeholder="Enter center business type"
          // helperText={errors.centreDetail?.district?.message}
          // error={!!errors.centreDetail?.district}
          type="text"
        />
      </StyledStack>

      <StyledStack>
        <Typography>Centre Status</Typography>

        <AutoComplete
          sx={{ background: "#fff" }}
          // {...field}
          id="center-status"
          options={[
            { id: 1, label: "Yes" },
            { id: 2, label: "No" },
          ]}
          matchKey="id"
          labelKey="label"
          onChange={(e) => handleFilterFormChange("centerStatus", e)}
          value={filter.centerStatus}
          placeholder="Select Center status"
          disableClearable={false}
        />
      </StyledStack>

      <StyledStack>
        <Typography>Centre Manager</Typography>

        <AutoComplete
          sx={{ background: "#fff" }}
          // {...field}
          id="role-select"
          options={centerManager}
          matchKey="id"
          labelKey="label"
          onChange={(e) => handleFilterFormChange("centerManagerData", e)}
          value={filter.centerManagerData}
          placeholder="Select Center Manager"
          disableClearable={false}
        />
      </StyledStack>

      <StyledStack>
        <Typography>Programme type</Typography>

        <AutoComplete
          sx={{ background: "#fff" }}
          // {...field}
          id="role-select"
          options={programTypes}
          matchKey="id"
          labelKey="label"
          onChange={(e) => handleFilterFormChange("programType", e)}
          value={filter.programType}
          placeholder="Select Programme type"
          disableClearable={false}
        />
      </StyledStack>

      <StyledStack>
        <Typography>MCP Centre</Typography>

        <AutoComplete
          sx={{ background: "#fff" }}
          // {...field}
          id="role-select"
          options={[
            { id: 1, label: "Yes" },
            { id: 2, label: "No" },
          ]}
          matchKey="id"
          labelKey="label"
          onChange={(e: any) => {
            handleFilterFormChange("mcpCenter", e);
          }}
          value={filter.mcpCenter}
          placeholder="Select MCP Centre"
          disableClearable={false}
        />
      </StyledStack>

      <StyledStack>
        <Typography>National Sr. Director</Typography>

        <AutoComplete
          sx={{ background: "#fff" }}
          // {...field}
          id="role-select"
          options={[
            { id: 1, label: "Yes" },
            { id: 2, label: "No" },
          ]}
          matchKey="id"
          labelKey="label"
          onChange={(e) => handleFilterFormChange("nationalDirector", e)}
          value={filter.nationalDirector}
          placeholder="Select National Sr. Director"
          disableClearable={false}
        />
      </StyledStack>

      <StyledStack>
        <Typography>Regional director</Typography>

        <AutoComplete
          sx={{ background: "#fff" }}
          // {...field}
          id="role-select"
          options={regionalDirector}
          matchKey="id"
          labelKey="label"
          onChange={(e) => handleFilterFormChange("regionalDirector", e)}
          value={filter.regionalDirector}
          placeholder="Select National Sr. Director"
          disableClearable={false}
        />
      </StyledStack>

      <StyledStack>
        <Typography>City manager</Typography>

        <AutoComplete
          sx={{ background: "#fff" }}
          // {...field}
          id="role-select"
          options={cityManager}
          matchKey="id"
          labelKey="label"
          onChange={(e) => handleFilterFormChange("cityManager", e)}
          value={filter.cityManager}
          placeholder="Select city manager"
          disableClearable={false}
        />
      </StyledStack>

      <StyledStack>
        <Typography>Cluster manager</Typography>

        <AutoComplete
          sx={{ background: "#fff" }}
          // {...field}
          id="role-select"
          options={clusterManager}
          matchKey="id"
          labelKey="label"
          onChange={(e) => handleFilterFormChange("clusterManager", e)}
          value={filter.clusterManager}
          placeholder="Select cluster manager"
          disableClearable={false}
        />
      </StyledStack>

      <StyledStack>
        <Typography>CRM/SPOC</Typography>

        <AutoComplete
          sx={{ background: "#fff" }}
          // {...field}
          id="role-select"
          options={placementHead}
          matchKey="id"
          labelKey="label"
          onChange={(e) => handleFilterFormChange("placement", e)}
          value={filter.placement}
          placeholder="Select CRM/SPOC"
          disableClearable={false}
        />
      </StyledStack>
      <StyledStack>
        <Typography>Regional Data Manager</Typography>

        <AutoComplete
          sx={{ background: "#fff" }}
          // {...field}
          id="role-select"
          options={regionalDataManager}
          matchKey="id"
          labelKey="label"
          onChange={(e) => handleFilterFormChange("regionalDataManager", e)}
          value={filter.regionalDataManager}
          placeholder="Select Regional Data Manager"
          disableClearable={false}
        />
      </StyledStack>
    </Stack>
  );
};

const StyledStack = styled(Stack)(() => ({
  marginBottom: "10px",
}));

export default FilterForm;
