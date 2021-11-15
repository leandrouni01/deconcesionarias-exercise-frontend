import { AlertColor } from "@mui/material";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getItemAll, deleteItem } from '../../../services/GenericItemService'
import Category from '../../../models/Category'


const useManageCategoriesScreen = () => {
  const queryClient = useQueryClient(); 

  const [toast, setToast] = useState<{ open: boolean, severity: AlertColor, message: string }>({
    open: false,
    severity: "success",
    message: ""
  })

  const { isSuccess, isFetching, isError, data: categories, error } = useQuery('categories', async () => {
    const res = await getItemAll<Category>("/categories");
    return res.data
  })

  const deleteMutation = useMutation('categories', async (id:number) => {
    const res = await deleteItem<Category>("/categories/" + id);
    return res.data
  }, {
    onSuccess: (data, variables) => {
      const categories = queryClient.getQueryData<Category[]>("categories")?.filter((cat) => {
        return cat.id !== variables;
      })
      queryClient.setQueryData("categories", categories);
      setToast({
        open: true,
        severity: "success",
        message: "Category deleted successfully"
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
    categories,
    error,
    onToastClose,
    onDelete
  }
}

export default useManageCategoriesScreen