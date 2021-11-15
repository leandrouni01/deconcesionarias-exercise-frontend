import React from 'react'
import { Alert, Box, CircularProgress, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useQuery } from 'react-query';
import { useParams } from 'react-router'
import Vehicle from '../../models/Vehicle';
import { getItemById } from '../../services/GenericItemService';
import { Link } from 'react-router-dom';
import VehicleFormComponent from '../../components/vehicleFormComponent';

const UpdateVehicleScreen = () => {

  const { id } = useParams();
  const { isSuccess, isError, isFetching, data: vehicleValues, error } = useQuery<Vehicle>(["vehicles", id], async () => {
    const result = await getItemById<Vehicle>("vehicles/" + id);
    return result.data
  }, { refetchOnWindowFocus: false })

  return (
    <Paper>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={Link}
            to="/vehicles/manage"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Update Vehicle
          </Typography>
        </Toolbar>
      </Box>

      {
        isFetching &&
        <CircularProgress sx={{
          mx:"auto"
        }}/>
      }

      {
        isError && 
        <Alert severity="error">{(error as Error).message}</Alert>
      }

      {
        isSuccess && !isFetching &&
        <VehicleFormComponent vehicleValues={vehicleValues}/>
      }
    </Paper>
  )
}

export default UpdateVehicleScreen