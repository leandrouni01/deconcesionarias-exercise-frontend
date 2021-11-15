import React from 'react';
import { Controller } from "react-hook-form";
import { Stack, TextField, Snackbar, Alert, Button } from '@mui/material';
import { VehicleFormComponentProps } from './types';
import useVehicleFormHook from './hooks'

const VehicleFormComponent = ({ vehicleValues }: VehicleFormComponentProps) => {

  const {
    onSubmit,
    control,
    handleSubmit,
    errors,
    onToastClose,
    isLoading,
    toast
  } = useVehicleFormHook(vehicleValues);

  return (
    <>
      <Stack
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        alignItems="center"
        justifyContent="flex-start"
        gap="2em"
        minHeight="75vh"
        sx={
          {
            px: 1,
            pt: 1
          }
        }
      >

        <Controller
          name="name"
          defaultValue=""
          control={control}
          rules={{ required: "Field name is required" }}
          render={({ field }) =>
            <TextField
              error={errors.name ? true : false}
              label="Name"
              variant="filled"
              inputProps={field}
              helperText={errors.name?.message}
              sx={
                {
                  width: "75%"
                }
              }
            />
          }
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={isLoading}
          sx={
            {
              width: "25%",
              alignSelf: "center"
            }
          }
        >
          Submit
        </Button>
      </Stack>
      <Snackbar open={toast.open} autoHideDuration={6000} onClose={onToastClose}>
        <Alert severity={toast.severity} sx={{ width: '100%' }} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default VehicleFormComponent