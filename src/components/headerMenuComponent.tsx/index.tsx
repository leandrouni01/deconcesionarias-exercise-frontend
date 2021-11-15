import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useMatch } from 'react-router-dom';

export default function HeaderMenu() {

  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorElement);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const options = React.useMemo(() => 
    [
      {to: "/vehicles/manage", linkMessage: "Manage Vehicles"},
      {to: "/properties/manage", linkMessage: "Manage Properties"},
      {to: "/categories/manage", linkMessage: "Manage Categories"},
    ]
  ,[])

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          options.map((opt, index) => 
            <MenuItem 
            component={Link} 
            key={index} 
            to={opt.to}
            selected={
              Boolean(useMatch(opt.to))
            }
            >
              {opt.linkMessage}
            </MenuItem>  
          )
        }
      </Menu>
    </>
  );
}