import React from 'react';
import { Controller } from "react-hook-form";
import {
  Stack, TextField, Button, Snackbar,
  Alert, FormControl,
  InputLabel, MenuItem, Select, FormHelperText,
  CircularProgress
} from '@mui/material';
import { PropertyFormComponentProps, IPropertyForm } from './types';
import useMUIIcon from '../../hooks/useMUIIcon';
import usePropertyFormHook from './hooks';

const PropertyFormComponent = ({ propertyValues }: PropertyFormComponentProps) => {

  const {
    isFetching,
    isError,
    categories,
    control,
    handleSubmit,
    errors,
    toast,
    onToastClose,
    onSubmit,
    isLoading
  } = usePropertyFormHook(propertyValues)

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
        {
          isFetching ?
            <CircularProgress /> :
            isError ?
              <Alert severity="error">Error on category fetching</Alert> :
              <Controller
                name="property_category_FK"
                defaultValue={0}
                control={control}
                rules={{
                  validate: (fk) => {
                    return fk != 0 ? true :
                      "You must choose a category"
                  }
                }}
                render={({ field }) =>
                  <FormControl
                    sx={{
                      width: "75%"
                    }}
                    error={
                      errors.property_category_FK ? true : false
                    }
                  >
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="category"
                      inputProps={field}
                    >
                      <MenuItem value={0} key={0} disabled>Select a category</MenuItem>
                      {
                        categories?.map((cat) => {
                          const Icon = useMUIIcon(cat.icon)
                          return (<MenuItem key={cat.id} value={cat.id}>
                            <Icon />
                            {cat.name}
                          </MenuItem>)
                        })
                      }
                    </Select>
                    {errors.property_category_FK &&
                      <FormHelperText>{errors.property_category_FK?.message}</FormHelperText>
                    }
                  </FormControl>
                }
              />
        }

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

export default PropertyFormComponent