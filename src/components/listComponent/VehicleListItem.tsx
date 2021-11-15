import React from 'react'
import { IconButton, ListItem, ListItemButton, ListItemText, Typography, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { VehicleItemProps } from './types/VehicleItemTypes'
import { Link } from 'react-router-dom'

const VehicleItem = (props: VehicleItemProps) => {
  const { data: { name, id }, onDelete } = props;

  return (
    <ListItem
      sx={{ borderBottom: 1, borderColor: 'divider' }}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onDelete(id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton component={Link} to={`/vehicles/update/${id}`}>
        <ListItemText
          primary={name}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default VehicleItem