import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Avatar } from '@mui/material';
import HeaderMenu from '../headerMenuComponent.tsx';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 , my:1}}>
      <AppBar position="static">
        <Toolbar>
          <Avatar 
          src="https://cdn.pixabay.com/photo/2018/09/06/10/02/car-icon-3657902_960_720.png" 
          alt="Product Logo"
          component={Link}
          to="/"  
          sx={{
            mr: 2,
            width: "3em",
            height: "3em"
          }}/>
          <Typography variant="h6"
          sx={{ 
            flexGrow: 1,
            color:"inherit",
            textDecoration: "none"
           }}
          >
            Vehicle Ratings
          </Typography>
          <HeaderMenu/>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default HeaderComponent
