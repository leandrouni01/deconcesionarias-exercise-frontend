import { useState } from "react";
import { useMutation, useQueryClient } from 'react-query';
import Vehicle from '../../../models/Vehicle';
import { createItem, updateItem } from '../../../services/GenericItemService';
import { useForm, SubmitHandler } from "react-hook-form";
import { AlertColor } from '@mui/material';
import { IVehicleForm } from "../types";


const useVehicleFormHook = (vehicleValues?:{ id:number, name: string}) => {

  const queryClient = useQueryClient();

  const defaultValues = vehicleValues ? {
    name: vehicleValues.name
  } : {
    name: "",
  }

  const action = vehicleValues ? {
    success: "updated",
    error: "update"
  } : {
    success: "created",
    error: "creation"
  }

  const [toast, setToast] = useState<{ open: boolean, severity: AlertColor, message: string }>({
    open: false,
    severity: "success",
    message: ""
  })

  const onToastClose = () => {
    setToast({
      open: false,
      severity: "success",
      message: ""
    })
  }

  const { control, handleSubmit, formState: { errors }, reset } = useForm<IVehicleForm>({
    defaultValues
  });

  const { isLoading, mutate } = useMutation("vehicles", async (data: IVehicleForm) => {
    if (vehicleValues) {
      const result = await updateItem<Vehicle>("/vehicles/" + vehicleValues.id, {
        id: vehicleValues.id,
        ...data
      });
      return result.data
    } else {
      const result = await createItem<Vehicle>("/vehicles", { id: 0, ...data });
      return result.data
    }
  }, {
    onSuccess: (data, variables) => {
      if (vehicleValues) {
        const oldVehicles = queryClient.getQueryData<Vehicle[]>("vehicles")
        const newVehicles = oldVehicles?.map((v: Vehicle) => {
          if (v.id == data.id) {
            return {
              ...variables,
              ...v
            }
          } else {
            return v
          }
        })
        queryClient.setQueryData("vehicles", newVehicles)
      } else {
        const oldVehicles = queryClient.getQueryData<Vehicle[]>("vehicles")
        const newVehicles = oldVehicles ? [...oldVehicles] : [];
        newVehicles.push({
          id: data.id,
          name: variables.name
        })
        queryClient.setQueryData("vehicles", newVehicles)
        reset()
      }
      setToast({
        open: true,
        severity: "success",
        message: `Vehicle ${action.success} successfully`
      })
    },
    onError: () => {
      setToast({
        open: true,
        severity: "error",
        message: `Error on vehicle ${action.error}`
      })
    }
  })

  const onSubmit: SubmitHandler<IVehicleForm> = data => {
    mutate(data)
  };

  return {
    onSubmit,
    control, 
    handleSubmit,
    errors,
    onToastClose,
    isLoading,
    toast
  }
}

export default useVehicleFormHook;