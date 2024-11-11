import React from "react";

import { Controller } from "react-hook-form";
import { styled, SxProps, Theme } from "@mui/material/styles";

// @mui components
import FormControl from "../mui/FormControl";
import Stack from "../mui/Stack";
import TextField_new from "../mui/TextField_new";
import Box from "../mui/Box";
import AutoComplete from "../mui/AutoComplete";

interface SelectOption {
  label: string | number;
  value: string | number;
}
interface AddCentreFormProps {
  control: any;
  errors: any;
  selectOptions: SelectOption[] | any;
  program: any;
  selectOption: any;
}

const StyledLabel = styled(Box)(({ theme }) => ({
  fontSize: "14px !important",
  marginBottom: "3px !important",
  fontWeight: "500 !important",
  color: "#191919 !important",
}));

const AddCentreForm: React.FC<AddCentreFormProps> = ({
  control,
  errors,
  selectOptions,
  selectOption,
  program,
}) => {
  return (
    <Stack direction="column">
      {/* 1. User name */}
      <Stack>
        <Controller
          name="addUserDetails.username"
          control={control}
          rules={{
            required: "Username is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Username can only contain alphabets",
            },
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long",
            },
            maxLength: {
              value: 20,
              message: "Username must be less than 20 characters",
            },
          }}
          render={({ field }) => (
            <>
              <StyledLabel>User name</StyledLabel>
              <FormControl error={!!errors.addUserDetails?.username} fullWidth>
                <TextField_new
                  {...field}
                  id="user-name"
                  placeholder="Enter username"
                  helperText={errors.addUserDetails?.username?.message}
                  error={!!errors.addUserDetails?.username?.message}
                  autoFocus={true}
                  disabled={false}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      {/* 2. Email */}
      <Stack>
        <Controller
          name="addUserDetails.email"
          control={control}
          rules={{
            required: "Email address is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email address",
            },
          }}
          render={({ field }) => (
            <>
              <StyledLabel>Email address</StyledLabel>
              <FormControl error={!!errors.addUserDetails?.email} fullWidth>
                <TextField_new
                  {...field}
                  id="email-address"
                  placeholder="Enter email address"
                  helperText={errors.addUserDetails?.email?.message}
                  error={!!errors.addUserDetails?.email?.message}
                  type="email"
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      {/* 4. Role id */}
      <Stack mb="18px">
        <Controller
          name="addUserDetails.roleId"
          control={control}
          rules={{ required: "Role is required" }}
          render={({ field }) => {
            return (
              <>
                <StyledLabel>Role</StyledLabel>
                <FormControl error={!!errors.addUserDetails?.roleId} fullWidth>
                  <AutoComplete
                    {...field}
                    id="role-select"
                    options={selectOptions}
                    matchKey="value"
                    labelKey="label"
                    placeholder="Select Role"
                    disableClearable={false}
                    errorMsg={errors.addUserDetails?.roleId?.message}
                    loading={false}
                    value={{
                      label: field?.value?.label,
                      value: field?.value?.value,
                    }}
                    sx={{ background: "#ffffff" }}
                  />
                </FormControl>
              </>
            );
          }}
        />
      </Stack>

      {/* Example of multiple select */}
      {/* <Stack>
        <Controller
          name="addUserDetails.roleIds"
          control={control}
          rules={{ required: "Role is required" }}
          render={({ field }) => (
            <>
              <StyledLabel>Role</StyledLabel>
              <FormControl error={!!errors.addUserDetails?.roleId} fullWidth>
                <AutoComplete 
                  {...field}
                  id="role-select"
                  options={selectOptions}
                  matchKey="value"
                  labelKey="label"
                  placeholder="Select Role"
                  errorMsg={errors.addUserDetails?.roleId?.message}
                  loading={false}
                  multiple={true}
                   sx={{background:"#ffffff"}}
                />
              </FormControl>
            </>
          )}
        />
      </Stack> */}

      {/* 6. Department */}
      <Stack>
        <Controller
          name="addUserDetails.department"
          control={control}
          rules={{
            required: "Department is required",
          }}
          render={({ field }) => (
            <>
              <StyledLabel>Department</StyledLabel>
              <FormControl
                error={!!errors.addUserDetails?.department}
                fullWidth
              >
                <TextField_new
                  {...field}
                  id="Department"
                  placeholder="Enter department"
                  helperText={errors.addUserDetails?.department?.message}
                  error={!!errors.addUserDetails?.department?.message}
                  autoFocus={true}
                  disabled={false}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      {/* emp id  */}
      <Stack>
        <Controller
          name="addUserDetails.empId"
          control={control}
          rules={{
            required: "Employee Id is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Employee Id can only contain Number",
            },
          }}
          render={({ field }) => (
            <>
              <StyledLabel>Employee Id</StyledLabel>
              <FormControl error={!!errors.addUserDetails?.empId} fullWidth>
                <TextField_new
                  {...field}
                  id="Employee"
                  placeholder="Employee Id"
                  helperText={errors.addUserDetails?.empId?.message}
                  error={!!errors.addUserDetails?.empId?.message}
                  autoFocus={true}
                  disabled={false}
                />
              </FormControl>
            </>
          )}
        />
      </Stack>

      {/* 7. Centers  */}
      <Stack mb="18px">
        <Controller
          name="addUserDetails.center"
          control={control}
          rules={{ required: "Centers is required" }}
          render={({ field }) => {
            return (
              <>
                <StyledLabel>Centers</StyledLabel>
                <FormControl error={!!errors.addUserDetails?.center} fullWidth>
                  <AutoComplete
                    {...field}
                    id="Centers-select"
                    options={selectOption}
                    matchKey="id"
                    labelKey="label"
                    placeholder="Select Centers"
                    disableClearable={false}
                    errorMsg={errors.addUserDetails?.center?.message}
                    loading={false}
                    multiple={true}
                    value={field.value || []}
                    sx={{ background: "#ffffff" }}
                  />
                </FormControl>
              </>
            );
          }}
        />
      </Stack>

      {/* 8. Programs  */}
      <Stack>
        <Controller
          name="addUserDetails.program"
          control={control}
          rules={{ required: "Programs is required" }}
          render={({ field }) => {
            return (
              <>
                <StyledLabel>Programs</StyledLabel>
                <FormControl error={!!errors.addUserDetails?.program} fullWidth>
                  <AutoComplete
                    {...field}
                    id="Programs-select"
                    options={program}
                    matchKey="value"
                    labelKey="label"
                    placeholder="Select Programs"
                    disableClearable={false}
                    errorMsg={errors.addUserDetails?.program?.message}
                    loading={false}
                    multiple={true}
                    value={field.value || []}
                    sx={{ background: "#ffffff" }}
                  />
                </FormControl>
              </>
            );
          }}
        />
      </Stack>
    </Stack>
  );
};

export default AddCentreForm;
