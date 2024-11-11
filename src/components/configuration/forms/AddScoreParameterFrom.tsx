import React, { useState } from "react";

import { Controller } from "react-hook-form";
import styled from "@emotion/styled";

// mui component
import FormControlLabel from "../../mui/FormControlLabel";
import FormHelperText from "../../mui/FormHelperText";
import FormControl from "../../mui/FormControl";
import Typography from "../../mui/Typography";
import TextField from "../../mui/TextField";
import Checkbox from "../../mui/Checkbox";
import Stack from "../../mui/Stack";
import Box from "../../mui/Box";

interface Props {
  control: any;
}

const AddScoreParameterFrom: React.FC<Props> = (props) => {
  const { control } = props;

  return (
    <Stack>
      <Box sx={{ mb: "10px" }}>
        <Controller
          name="parameterFormData.parameterName"
          control={control}
          rules={{ required: "Parameter name is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Typography>Parameter name</Typography>
              <FormControl error={!!error} fullWidth>
                <TextField
                  size="small"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  sx={{ width: "100%" }}
                  placeholder="Enter parameter name"
                />
                <StyledFormHelperText>
                  {error ? error.message : " "}
                </StyledFormHelperText>
              </FormControl>
            </>
          )}
        />
      </Box>

      <Box
        sx={{
          p: "10px 7px 10px 5px",
          maxWidth: 400,
          backgroundColor: "#f0f0f0",
          borderRadius: 2,
        }}
      >
        <Controller
          name="parameterFormData.weightage"
          control={control}
          rules={{ required: "Weightage is required" }}
          render={({ field, fieldState: { error } }) => (
            <StyledStack>
              <Typography>Weightage</Typography>
              <FormControl error={!!error} fullWidth>
                <TextField
                  size="small"
                  sx={{ bgcolor: "white" }}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  placeholder="Enter weightage"
                />
                <StyledFormHelperText>
                  {error ? error.message : " "}
                </StyledFormHelperText>
              </FormControl>
            </StyledStack>
          )}
        />

        <Controller
          name="parameterFormData.region"
          control={control}
          rules={{ required: "Region is required" }}
          render={({ field, fieldState: { error } }) => (
            <StyledStack>
              <Typography>Region</Typography>
              <FormControl error={!!error} fullWidth>
                <Stack direction="row" sx={{ mt: "-10px" }}>
                  {["All", "East", "West", "North", "South"].map((btn: any) => (
                    <FormControlLabel
                      key={btn}
                      sx={{ fontSize: "10px" }}
                      control={
                        <Checkbox
                          // checked={}
                          sx={{ fontSize: "10px" }}
                          onChange={() => field.onChange(btn)}
                        />
                      }
                      label={btn}
                      value={btn}
                    />
                  ))}
                </Stack>
                <FormHelperText sx={{ marginTop: "-8px", marginLeft: "2px" }}>
                  {error ? error.message : " "}
                </FormHelperText>
              </FormControl>
            </StyledStack>
          )}
        />

        <Box sx={{ marginTop: "3px" }}>
          <Controller
            name="parameterFormData.measurementCriteria"
            control={control}
            rules={{ required: "Measurement criteria is required" }}
            render={({ field, fieldState: { error } }) => (
              <StyledStack>
                <Typography>Measurement Criteria</Typography>
                <FormControl error={!!error} fullWidth>
                  <TextField
                    size="small"
                    sx={{ bgcolor: "white" }}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    placeholder="Enter measurement criteria"
                  />
                  <StyledFormHelperText>
                    {error ? error.message : " "}
                  </StyledFormHelperText>
                </FormControl>
              </StyledStack>
            )}
          />
        </Box>

        <Box sx={{ marginTop: "3px" }}>
          <Controller
            name="parameterFormData.score"
            control={control}
            rules={{ required: "Score is required" }}
            render={({ field, fieldState: { error } }) => (
              <StyledStack>
                <Typography>Score</Typography>
                <FormControl error={!!error} fullWidth>
                  <TextField
                    size="small"
                    sx={{ bgcolor: "white" }}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    placeholder="Enter measurement criteria"
                  />
                  <StyledFormHelperText>
                    {error ? error.message : " "}
                  </StyledFormHelperText>
                </FormControl>
              </StyledStack>
            )}
          />
        </Box>
      </Box>
    </Stack>
  );
};

const StyledStack = styled(Stack)(() => ({
  marginTop: "0px",
  marginBottom: "2px",
}));

const StyledFormHelperText = styled(FormHelperText)(() => ({
  marginTop: "-2px",
  marginLeft: "2px",
}));

export default AddScoreParameterFrom;
