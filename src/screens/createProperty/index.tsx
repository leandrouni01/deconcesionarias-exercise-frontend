import { Paper, Box, Toolbar, IconButton, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PropertyFormComponent from '../../components/propertyFormComponent'

const CreatePropertyScreen = () => {
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
            Add Property
          </Typography>
        </Toolbar>
      </Box>
      <PropertyFormComponent />
    </Paper>
  )
}

export default CreatePropertyScreen
