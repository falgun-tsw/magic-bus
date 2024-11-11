import { useForm, Controller } from "react-hook-form";
import RadioGroup from "../mui/RadioGroup";
import FormControlLabel from "../mui/FormControlLabel";
import Typography from "../mui/Typography";
import Stack from "../mui/Stack";
import Checkbox from "../../components/mui/Checkbox";
import styled from "@emotion/styled";
import MagicAutoCompleteSelect from "../common/MagicAutoCompleteSelect";

interface RatioButton {
  label: string;
  value: string;
}

interface DashBroadFilterFormProps {
  ratiobtn: RatioButton[];
  centerList: { centerSelect: { id: string; label: string }[] }; 
  filter: { center: string }; 
  handleFilterFormChange: (field: string, value: any) => void;
}

const DashBroadFilterForm: React.FC<DashBroadFilterFormProps> = ({
  ratiobtn,
  centerList,
  filter,
  handleFilterFormChange,
}) => {
  const { control } = useForm();

  return (
    <Stack>
     <StyledStack>
        <Typography>Region</Typography>
        <Controller
          name="selectedRegion"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <StyledCheckboxGroup>
              {ratiobtn.map((btn) => (
                <FormControlLabel
                  key={btn.value}
                  control={
                    <Checkbox
                      checked={value === btn.value}
                      onChange={() => onChange(btn.value)}
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
            </StyledCheckboxGroup>
          )}
        />
      </StyledStack>

      <StyledStack>
        <Typography>Medals</Typography>
        <MagicAutoCompleteSelect
          getValue="id"
          options={centerList.centerSelect} 
          onChange={(e) => handleFilterFormChange("centerId", e)} 
          value={filter.center}
          placeholder="Select Medals"
        />
      </StyledStack>
      <StyledStack>
        <Typography>State</Typography>
        <MagicAutoCompleteSelect
          options={centerList.centerSelect}
          onChange={(e) => handleFilterFormChange("state", e)}
          value={filter.center}
          placeholder="Select state"
        />
      </StyledStack>
      <StyledStack>
        <Typography>City</Typography>
        <MagicAutoCompleteSelect
          options={centerList.centerSelect}
          onChange={(e) => handleFilterFormChange("state", e)}
          value={filter.center}
          placeholder="Select City"
        />
      </StyledStack>

      <StyledStack>
        <Typography>Regional manager</Typography>
        <MagicAutoCompleteSelect
          options={centerList.centerSelect}
          onChange={(e) => handleFilterFormChange("state", e)}
          value={filter.center}
          placeholder="Select Regional manager"
        />
      </StyledStack>
      <StyledStack>
        <Typography>City manager</Typography>
        <MagicAutoCompleteSelect
          options={centerList.centerSelect}
          onChange={(e) => handleFilterFormChange("state", e)}
          value={filter.center}
          placeholder="Select Cluster manager"
        />
      </StyledStack>
      <StyledStack>
        <Typography>Cluster Manager</Typography>
        <MagicAutoCompleteSelect
          options={centerList.centerSelect}
          onChange={(e) => handleFilterFormChange("state", e)}
          value={filter.center}
          placeholder="Select City Manager"
        />
      </StyledStack>
      <StyledStack>
        <Typography>Funder</Typography>
        <MagicAutoCompleteSelect
          options={centerList.centerSelect}
          onChange={(e) => handleFilterFormChange("state", e)}
          value={filter.center}
          placeholder="Select Funder"
        />
      </StyledStack>
      <StyledStack>
        <Typography>centre</Typography>
        <MagicAutoCompleteSelect
          options={centerList.centerSelect}
          onChange={(e) => handleFilterFormChange("state", e)}
          value={filter.center}
          placeholder="Select centre"
        />
      </StyledStack>
    </Stack>
  );
};

const StyledCheckboxGroup = styled(Stack)({
  flexDirection: "row",
});
const StyledStack = styled(Stack)(() => ({
  marginBottom: "15px",
}));

export default DashBroadFilterForm;
