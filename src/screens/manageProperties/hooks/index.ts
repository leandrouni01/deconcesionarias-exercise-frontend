import { AlertColor } from "@mui/material";
import { useCallback, useState } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getItemAll, deleteItem } from '../../../services/GenericItemService'
import VehicleProperty from '../../../models/VehicleProperty'


const useManagePropertiesScreen = () => {
  const queryClient = useQueryClient(); 

  const [toast, setToast] = useState<{ open: boolean, severity: AlertColor, message: string }>({
    open: false,
    severity: "success",
    message: ""
  })

  const { isSuccess, isFetching, isError, data: properties, error } = useQuery('properties', async () => {
    const res = await getItemAll<VehicleProperty>("/properties");
    return res.data
  })

  const deleteMutation = useMutation('properties', async (id:number) => {
    const res = await deleteItem<VehicleProperty>("/properties/" + id);
    return res.data
  }, {
    onSuccess: (data, variables) => {
      const properties = queryClient.getQueryData<VehicleProperty[]>("properties")?.filter((cat) => {
        return cat.id !== variables;
      })
      queryClient.setQueryData("properties", properties);
      setToast({
        open: true,
        severity: "success",
        message: "Vehicle property deleted successfully"
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


  const onToastClose = useCallback(() => {
    setToast({
      open: false,
      severity: "success",
      message: ""
    })
  },[])

  const onDelete = useCallback((id: number, callback?: (() => any)) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    deleteMutation.mutate(id);
    if (callback) {
      callback()
    }
  },[])

  return {
    toast,
    isSuccess,
    isFetching,
    isError,
    properties,
    error,
    onToastClose,
    onDelete
  }
}

export default useManagePropertiesScreen