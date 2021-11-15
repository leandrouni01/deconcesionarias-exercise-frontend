import React from 'react';
import IconInput from '../iconInputComponent';
import { Controller } from "react-hook-form";
import { Stack, TextField, Snackbar, Alert, Button } from '@mui/material';
import { CategoryFormComponentProps } from './types';
import useCategoryFormHook from './hooks'

const CategoryFormComponent = ({ categoryValues }: CategoryFormComponentProps) => {

  const {
    control,
    handleSubmit,
    register,
    setValue,
    errors,
    icon,
    setIcon,
    toast,
    onToastClose,
    isLoading,
    onSubmit
  } = useCategoryFormHook(categoryValues)

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
        <input type="hidden" {...register("icon", { required: "You have not selected any icon" })} />
        <IconInput icon={icon} setIcon={setIcon} setValue={setValue} error={errors.icon ? true : false} errorMessage={errors.icon ? errors.icon.message : ""} />

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

export default CategoryFormComponent
