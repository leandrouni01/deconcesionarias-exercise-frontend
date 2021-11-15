import React, { useMemo } from 'react'
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import useMUIIcon from '../../hooks/useMUIIcon'
import { CategoryItemProps } from './types/CategoryItemTypes'
import { Link } from 'react-router-dom'

const CategoryItem = (props: CategoryItemProps) => {
  const { data: { icon, name, id }, onDelete } = props;

  const CategoryIcon = useMemo(() => useMUIIcon(icon), [icon])

  return (
    <ListItem
      sx={{ borderBottom: 1, borderColor: 'divider' }}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onDelete(id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton component={Link} to={`/categories/update/${id}`}>
        <ListItemAvatar>
          <Avatar>
            <CategoryIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={name}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default CategoryItem
