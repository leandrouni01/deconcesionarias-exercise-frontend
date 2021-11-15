import React from 'react'
import { Alert, Button, Paper, Stack, CircularProgress, Divider, Snackbar, AlertColor } from '@mui/material'
import ItemList from '../../components/listComponent'
import VehicleItem from '../../components/listComponent/VehicleListItem'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import useManageVehiclesScreen from './hooks'
import Vehicle from '../../models/Vehicle'

const ManageVehiclesScreen = () => {

  const {
    toast,
    isSuccess,
    isFetching,
    isError,
    vehicles,
    error,
    onToastClose,
    onDelete
  } = useManageVehiclesScreen();

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
          to='/vehicles/add'
        >
          Add Vehicle
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
            <ItemList<Vehicle> items={vehicles ? vehicles : []} onDelete={onDelete} ItemComponent={VehicleItem} subHeaderTitle={'Vehicles'} />
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

export default ManageVehiclesScreen