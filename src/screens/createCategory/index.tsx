import React from 'react'

import { Paper, Box, Toolbar, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import CategoryFormComponent from '../../components/categoryFormComponent'

const CreateCategoryScreen = () => {

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
            Add Category
          </Typography>
        </Toolbar>
      </Box>
      <CategoryFormComponent />
    </Paper>
  )
}

export default CreateCategoryScreen
