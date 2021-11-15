import React, { useState, useCallback } from 'react'
import { List, ListSubheader, Box, Typography, Modal, Stack, Button } from '@mui/material'
import { ItemListProps } from './types/ItemListTypes'
import BaseModel from '../../models/BaseModel';

const ItemList = <T extends BaseModel, >(props:ItemListProps<T>) => {

  const {items, ItemComponent, subHeaderTitle, onDelete} = props;
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const openConfirmationModal = useCallback((id:number) => 
  (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOpen(true)
    setDeleteId(id)
  },[])

  const closeModal = useCallback(() => {
    setOpen(false)
  },[])
  

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  return (
    <>
      <List
      sx={{ width: '100%', bgcolor: 'background.paper',flexGrow: 1 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {subHeaderTitle}
        </ListSubheader>
      }
    >
      {
        items.map((item) =>
          <ItemComponent key={item.id} data={item} onDelete={openConfirmationModal}/>
        )
      }
    </List>
    <Modal
    open={open}
    onClose={closeModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="subtitle1" component="h2" textAlign="center">
          Are you sure you want to delete?
        </Typography>
        <Stack direction="row" justifyContent="space-evenly">
          <Button variant="contained" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onDelete(deleteId, closeModal)} color="warning">
            Delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  </>
  )
}

export default ItemList
