import { Tab } from '@mui/material'
import React, { useMemo } from 'react'
import useMUIIcon from '../../hooks/useMUIIcon'

type props = {
  icon:string,
  label:string
}

const CustomTab = ({ icon, label }:props) => {

  const Icon = useMemo(() => useMUIIcon(icon), [icon])

  return (
    <>
    <Icon fontSize="inherit"/>
     <span>{label}</span>
    </>
  )
}

export default CustomTab
