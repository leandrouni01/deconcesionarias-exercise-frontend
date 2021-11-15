import React from 'react'
import { Alert, Box, CircularProgress, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useQuery } from 'react-query';
import { useParams } from 'react-router'
import Category from '../../models/Category';
import { getItemById } from '../../services/GenericItemService';
import { Link } from 'react-router-dom';
import CategoryFormComponent from '../../components/categoryFormComponent';

const UpdateCategoryScreen = () => {

  const { id } = useParams();
  const { isSuccess, isError, isFetching, data: categoryValues, error } = useQuery<Category>(["categories", id], async () => {
    const result = await getItemById<Category>("categories/" + id);
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
            to="/categories/manage"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Update Category
          </Typography>
        </Toolbar>
      </Box>

      {
        isFetching &&
        <CircularProgress />
      }

      {
        isError && 
        <Alert severity="error">{(error as Error).message}</Alert>
      }

      {
        isSuccess && 
        <CategoryFormComponent categoryValues={categoryValues}/>
      }
    </Paper>
  )
}

export default UpdateCategoryScreen
