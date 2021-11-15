import React from 'react'
import { Alert, Box, CircularProgress, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useQuery } from 'react-query';
import { useParams } from 'react-router'
import Property from '../../models/VehicleProperty';
import { getItemById } from '../../services/GenericItemService';
import { Link } from 'react-router-dom';
import PropertyFormComponent from '../../components/propertyFormComponent';

const UpdatePropertyScreen = () => {

  const { id } = useParams();
  const { isSuccess, isError, isFetching, data: propertyValues, error } = useQuery<Property>(["properties", id], async () => {
    const result = await getItemById<Property>("properties/" + id);
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
            to="/properties/manage"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Update Property
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
        <PropertyFormComponent propertyValues={propertyValues}/>
      }
    </Paper>
  )
}

export default UpdatePropertyScreen