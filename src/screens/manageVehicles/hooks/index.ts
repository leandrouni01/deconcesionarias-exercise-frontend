import { AlertColor } from "@mui/material";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getItemAll, deleteItem } from '../../../services/GenericItemService'
import Vehicle from '../../../models/Vehicle'


const useManageCategoriesScreen = () => {
  const queryClient = useQueryClient(); 

  const [toast, setToast] = useState<{ open: boolean, severity: AlertColor, message: string }>({
    open: false,
    severity: "success",
    message: ""
  })

  const { isSuccess, isFetching, isError, data: vehicles, error } = useQuery('vehicles', async () => {
    const res = await getItemAll<Vehicle>("/vehicles");
    return res.data
  })

  const deleteMutation = useMutation('vehicles', async (id:number) => {
    const res = await deleteItem<Vehicle>("/vehicles/" + id);
    return res.data
  }, {
    onSuccess: (data, variables) => {
      const vehicles = queryClient.getQueryData<Vehicle[]>("vehicles")?.filter((cat) => {
        return cat.id !== variables;
      })
      queryClient.setQueryData("vehicles", vehicles);
      setToast({
        open: true,
        severity: "success",
        message: "Vehicle deleted successfully"
      })
    },
    onError: () => {
      setToast({
        open: true,
        severity: "error",
        message: "An error ocurred"
      })
    }
  })


  const onToastClose = () => {
    setToast({
      open: false,
      severity: "success",
      message: ""
    })
  }

  const onDelete = (id: number, callback?: (() => any)) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    deleteMutation.mutate(id);
    if (callback) {
      callback()
    }
  }

  return {
    toast,
    isSuccess,
    isFetching,
    isError,
    vehicles,
    error,
    onToastClose,
    onDelete
  }
}

export default useManageCategoriesScreen