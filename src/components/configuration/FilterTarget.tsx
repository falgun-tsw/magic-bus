import React from "react";
import Stack from "../mui/Stack";
import FormControlLabel from "../mui/FormControlLabel";
import Checkbox from "../mui/Checkbox";
import Typography from "../mui/Typography";
import FormControl from "../mui/FormControl";
import { Controller } from "react-hook-form";
import FormGroup from "../mui/FormGroup";
 interface Props {
   controller: any
 }

 const filterField = [
   { label: "All", value: "all" },
   { label: "Quarterly", value: "quarterly" },
   { label: "Yearly", value: "yearly" },
 ];

const FilterTarget: React.FC<Props> = (props) => {
  const {controller} = props

  
  return (
    <div>
      <Controller
        name="filter.targetDuration"
        control={controller}
        render={({ field }) => (
          <>
            <Typography>Target duration</Typography>
            <FormGroup>
              <Stack direction="row">
                {filterField.map((btn) => (
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
                              field.value.filter((value: string) => value !== btn.value)
                            );
                          }
                        }}
                      />
                    }
                    label={btn.label}
                    value={btn.value}
                  />
                ))}
              </Stack>
            </FormGroup>
          </>
        )}
      />
    </div>
  );
};

export default FilterTarget;
