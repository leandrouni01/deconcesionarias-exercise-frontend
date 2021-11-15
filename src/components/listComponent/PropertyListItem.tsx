import React from 'react'
import { IconButton, ListItem, ListItemButton, ListItemText, Typography, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { PropertyItemProps } from './types/PropertyItemTypes'
import { Link } from 'react-router-dom'
import useMUIIcon from '../../hooks/useMUIIcon'

const PropertyItem = (props: PropertyItemProps) => {
  const { data: { name, id , property_category}, onDelete } = props;

  const CategoryIcon = useMUIIcon(property_category ? property_category.icon : "")

  return (
    <ListItem
      sx={{ borderBottom: 1, borderColor: 'divider' }}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onDelete(id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton component={Link} to={`/properties/update/${id}`}>
        <ListItemText
          primary={name}
          secondary={ property_category ? 
            <Stack direction="row" alignItems="center" component="span">
              <Typography variant="subtitle2" component="span">
              Category: {property_category.name} 
            </Typography>
            <CategoryIcon />
            </Stack> :
            undefined
          }
        />
      </ListItemButton>
    </ListItem>
  )
}

export default PropertyItem