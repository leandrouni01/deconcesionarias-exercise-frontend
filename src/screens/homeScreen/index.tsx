import React from 'react'
import { Alert, CircularProgress, List, ListSubheader, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material'
import { useQuery } from 'react-query'
import Vehicle from '../../models/Vehicle'
import { getItemAll } from '../../services/GenericItemService'
import { Link } from 'react-router-dom'

const HomeScreen = () => {

  const { isFetching, isError, isSuccess, data: vehicles, error } = useQuery<Vehicle[]>('vehicles', async () => {
    const result = await getItemAll<Vehicle>('/vehicles')
    return result.data
  })

  return (
    <>
      {
        isFetching &&
        <CircularProgress />
      }

      {
        isError &&
        <Alert severity="error">
          En error ocurred
        </Alert>
      }

      {
        isSuccess &&
        <List
          sx={{ width: '100%', bgcolor: 'background.paper', flexGrow: 1, minHeight: "80vh" }}
          aria-labelledby="nested-list-subheader"
          component={Paper}

          subheader={
            <ListSubheader component="div" id="nested-list-subheader"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              Vehicles
            </ListSubheader>
          }
        >
          {
            vehicles &&
            vehicles.map((v) =>
              <ListItem key={v.id}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <ListItemButton component={Link} to={`/vehicles/details/${v.id}`}>
                  <ListItemText
                    primary={v.name}
                  />
                </ListItemButton>
              </ListItem>
            )
          }
        </List> 
      }

      {
        (!isFetching && vehicles && vehicles.length < 1) &&
        <Alert severity="warning">There are no vehicles on the database</Alert>
      }
    </>
  )
}

export default HomeScreen
