import React from 'react'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import { getItemAll, getItemById } from '../../services/GenericItemService';
import Vehicle from '../../models/Vehicle';
import { Alert, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import VehicleRatings from '../../components/vehicleRatingsComponent';
import { CategoryWithPropertiesAndValues } from '../../components/vehicleRatingsComponent/types'

const VehicleDetailsScreen = () => {

  const { id } = useParams();

  const vehicle = useQuery(['vehicles', id], async () => {
    const result = await getItemById<Vehicle>('/vehicles/' + id)
    return result.data
  })

  const ratings = useQuery(['ratings', id], async () => {
    const result = await getItemAll<CategoryWithPropertiesAndValues>('/ratings/' + id)
    return result.data
  })

  return (
    <Stack
      alignItems="center"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
      mt="1em"
    >

      {
        vehicle.isLoading && 
        <CircularProgress />
      }

      {
        vehicle.isError &&
        <Alert severity="error">
          An error ocurred when retrieving vehicle name
        </Alert> 
      }

      {
        vehicle.isSuccess && 
        <Typography variant="h1" fontSize="3.75rem" textAlign="center">
          {
            vehicle.data && vehicle.data.name
          }
        </Typography>
      }

      {
        (ratings.isFetching && !ratings.isSuccess) &&
        <CircularProgress />
      }

      {
        ratings.isError &&
        <Alert severity="error">
          An error ocurred when retrieving vehicle name
        </Alert> 
      }

      {
        ratings.isSuccess &&
        <VehicleRatings data={ratings.data} vehicleId={id ? +id : 0} />
      }
    </Stack>
  )
}

export default VehicleDetailsScreen
