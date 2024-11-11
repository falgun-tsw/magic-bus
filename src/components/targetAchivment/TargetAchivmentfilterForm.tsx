import { useForm, Controller } from "react-hook-form";
import Checkbox from "../../components/mui/Checkbox";
import FormControlLabel from "../mui/FormControlLabel";
import Typography from "../mui/Typography";
import Stack from "../mui/Stack";
import styled from "@emotion/styled";

import MagicAutoCompleteSelect from "../common/MagicAutoCompleteSelect";

interface RatioButton {
  label: string;
  value: string;
}

interface TAFilterFormProps {
  ratiobtn: RatioButton[];
  centerList: { centerSelect: { id: string; label: string }[] };
  filter: { center: string };
  handleFilterFormChange: (field: string, value: any) => void;
}

const TargetAchivmentfilterForm: React.FC<TAFilterFormProps> = ({
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
          placeholder="Select State"
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
          placeholder="Select City manager"
        />
      </StyledStack>
      <StyledStack>
        <Typography>Cluster manager</Typography>
        <MagicAutoCompleteSelect
          options={centerList.centerSelect}
          onChange={(e) => handleFilterFormChange("state", e)}
          value={filter.center}
          placeholder="Select Cluster manager"
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
        <Typography>City</Typography>
        <MagicAutoCompleteSelect
          options={centerList.centerSelect}
          onChange={(e) => handleFilterFormChange("state", e)}
          value={filter.center}
          placeholder="Select City"
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

export default TargetAchivmentfilterForm;
