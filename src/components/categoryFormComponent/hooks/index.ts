import { useState } from "react";
import { AlertColor } from '@mui/material' 
import { SubmitHandler, useForm } from "react-hook-form";
import Category from "../../../models/Category";
import { updateItem, createItem } from "../../../services/GenericItemService";
import { ICategoryForm } from "../types";
import { useMutation, useQueryClient } from 'react-query';

const useCategoryFormHook = (categoryValues?: {
  id:number,
  name: string,
  icon:string
}) => {

  const queryClient = useQueryClient();

  const defaultValues = categoryValues ? {
    icon: categoryValues.icon,
    name: categoryValues.name
  } : {
    name: "",
    icon: ""
  }

  const action = categoryValues? {
    success: "updated",
    error: "update"
  } : {
    success: "created",
    error: "creation"
  }

  const { control, handleSubmit, formState: { errors }, register, setValue, reset } = useForm<ICategoryForm>({
    defaultValues
  });

  const [icon, setIcon] = useState(defaultValues.icon)
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

  const { isLoading, mutate } = useMutation("categories", async (data:ICategoryForm) => {
    if(categoryValues) {
      const result = await updateItem<Category>("/categories/" + categoryValues.id, {
        id: categoryValues.id,
        ...data
      })
      return result.data
    } else {
      const result = await createItem<Category>("/categories", { id: 0, ...data })
      return result.data
    }
  },{
    onSuccess: (data, variables) => {
      if (categoryValues) {
        const oldCategories = queryClient.getQueryData<Category[]>("categories")
        const newCategories = oldCategories?.map((v: Category) => {
          if (v.id == data.id) {
            return {
              ...variables,
              ...v
            }
          } else {
            return v
          }
        })
        queryClient.setQueryData("categories", newCategories)
      } else {
        const oldCategories = queryClient.getQueryData<Category[]>("categories")
        const newCategories = oldCategories ? [...oldCategories] : [];
        newCategories.push({
          id: data.id,
          ...variables
        })
        queryClient.setQueryData("categories", newCategories)
        reset()
      }
      setToast({
        open: true,
        severity: "success",
        message: `Category ${action.success} successfully`
      })
    },
    onError: () => {
      setToast({
        open: true,
        severity: "error",
        message: `Error on ${action.error} update`
      })
    }
  })

  const onSubmit: SubmitHandler<ICategoryForm> = data => {
    mutate(data)
  };

  return {
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
  }
}

export default useCategoryFormHook