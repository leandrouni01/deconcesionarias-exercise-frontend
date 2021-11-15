import { AlertColor } from "@mui/material"
import { useState, useCallback } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useQuery } from "react-query"
import Category from "../../../models/Category"
import VehicleProperty from "../../../models/VehicleProperty"
import { getItemAll, updateItem, createItem } from "../../../services/GenericItemService"
import { IPropertyForm } from "../types"
import { useMutation, useQueryClient } from 'react-query';

const usePropertyFormHook = (propertyValues?: { id: number, name: string, property_category_FK: number}) => {

  const queryClient = useQueryClient();

  const defaultValues = propertyValues ? {
    name: propertyValues.name,
    property_category_FK: propertyValues.property_category_FK
  } : {
    name: "",
    property_category_FK: 0
  }

  const action = propertyValues? {
    success: "updated",
    error: "update"
  } : {
    success: "created",
    error: "creation"
  }

  const { isFetching, isError, data: categories } = useQuery<Category[]>("categories", async () => {
    const result = await getItemAll<Category>('/categories')
    return result.data
  }, { refetchOnWindowFocus: false })

  const { control, handleSubmit, formState: { errors }, register, setValue, reset } = useForm<IPropertyForm>({
    defaultValues
  });

  const [toast, setToast] = useState<{ open: boolean, severity: AlertColor, message: string }>({
    open: false,
    severity: "success",
    message: ""
  })

  const onToastClose = useCallback(() => {
    setToast({
      open: false,
      severity: "success",
      message: ""
    })
  }, [])

  const { isLoading, mutate } = useMutation("properties", async (data:IPropertyForm) => {
    if(propertyValues){
      const result = await  updateItem<VehicleProperty>("/properties/" + propertyValues.id, {
        id: propertyValues.id,
        ...data
      })
      return result.data;
    }

    const result = await createItem<VehicleProperty>("/properties", { id: 0, ...data })
    return result.data
  },{
    onSuccess: (data, variables) => {
      if (propertyValues) {
        const oldProperties = queryClient.getQueryData<VehicleProperty[]>("properties")
        const newProperties = oldProperties?.map((v: VehicleProperty) => {
          if (v.id == data.id) {
            return {
              ...variables,
              ...v
            }
          } else {
            return v
          }
        })
        queryClient.setQueryData("properties", newProperties)
      } else {
        const oldProperties = queryClient.getQueryData<VehicleProperty[]>("properties")
        const newProperties = oldProperties ? [...oldProperties] : [];
        newProperties.push({
          id: data.id,
          ...variables
        })
        queryClient.setQueryData("properties", newProperties)
        reset()
      }
      setToast({
        open: true,
        severity: "success",
        message: `Property ${action.success} successfully`
      })
    },
    onError: () => {
      setToast({
        open: true,
        severity: "error",
        message: `Error on property ${action.error}`
      })
    }
  })

  const onSubmit: SubmitHandler<IPropertyForm> = useCallback(data => {
    mutate(data)
  }, [propertyValues]);

  return {
    isFetching,
    isError,
    categories,
    control,
    handleSubmit,
    errors,
    register,
    setValue,
    toast,
    onToastClose,
    onSubmit,
    isLoading
  }
}

export default usePropertyFormHook