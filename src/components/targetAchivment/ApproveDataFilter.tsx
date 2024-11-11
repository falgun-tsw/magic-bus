import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "../mui/TextField"; // Adjust the import as needed
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ApproveDataFilter: React.FC = () => {
  const { control } = useForm();

  return (
    <Stack spacing={2}>
      <Typography style={{ color: "black" }}>Remark</Typography>
      <Controller
        name="remark"
        control={control}
        defaultValue=""
        render={({ field }) => (
            <TextField
            sx={{  }}
            InputProps={{
              sx: {
                borderRadius: 2, // Apply borderRadius here
                height:120
              },
            }}
            {...field}
            variant="outlined"
            fullWidth
            placeholder="Enter your remark here"
          />
        )}
      />
    </Stack>
  );
};

export default ApproveDataFilter;
