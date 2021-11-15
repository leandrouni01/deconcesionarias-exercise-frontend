import React, { useMemo } from 'react'
import { Alert, Button, Paper, Stack, CircularProgress, Divider, Snackbar } from '@mui/material'
import ItemList from '../../components/listComponent'
import PropertyItem from '../../components/listComponent/PropertyListItem'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import VehicleProperty from '../../models/VehicleProperty'
import useManagePropertiesScreen from './hooks'

const ManagePropertiesScreen = () => {

  const {
    toast,
    isSuccess,
    isFetching,
    isError,
    properties,
    error,
    onToastClose,
    onDelete
  } = useManagePropertiesScreen()

  return (
    <>
      <Stack
        alignItems="center"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
        mt="1em"
      >
        <Button
          variant="outlined"
          endIcon={<AddIcon />}
          color="success"
          component={Link}
          to='/properties/add'
        >
          Add Property
        </Button>
        {
          (isFetching && !isSuccess) &&
          <CircularProgress />
        }

        {
          isError &&
          <Alert severity="error">{(error as Error).message}</Alert>
        }

        {
          isSuccess &&
          <Paper elevation={1} sx={{ minHeight: "70vh", width: "100%", px: 1 }}>
            <ItemList<VehicleProperty> items={properties ? properties : []} onDelete={onDelete} ItemComponent={PropertyItem} subHeaderTitle={'Vehicle Properties'} />
          </Paper>
        }


        <Snackbar open={toast.open} autoHideDuration={5000} onClose={onToastClose}>
          <Alert severity={toast.severity} sx={{ width: '100%' }} variant="filled">
            {toast.message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  )
}

export default ManagePropertiesScreen