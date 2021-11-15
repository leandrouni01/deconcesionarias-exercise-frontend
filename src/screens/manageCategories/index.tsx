import React from 'react'
import { Alert, Button, Paper, Stack, CircularProgress, Divider, Snackbar, AlertColor } from '@mui/material'
import ItemList from '../../components/listComponent'
import CategoryItem from '../../components/listComponent/CategoryListItem'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import useManageCategoriesScreen from './hooks'
import Category from '../../models/Category'

const ManageCategoriesScreen = () => {

  const {
    toast,
    isSuccess,
    isFetching,
    isError,
    categories,
    error,
    onToastClose,
    onDelete
  } = useManageCategoriesScreen();

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
          to='/categories/add'
        >
          Add Category
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
            <ItemList<Category> items={categories ? categories : []} onDelete={onDelete} ItemComponent={CategoryItem} subHeaderTitle={'Categories'} />
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

export default ManageCategoriesScreen
