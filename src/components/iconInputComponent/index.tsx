import React, { useState } from 'react'
import { Avatar, Stack, Button, Collapse, Paper, Typography } from '@mui/material'
import useMUIIcon from '../../hooks/useMUIIcon';
import IconInputBox from './IconInputBox';
import { UseFormSetValue } from 'react-hook-form';


type IconInputProps = {
  icon?: string,
  setIcon: (value: React.SetStateAction<string>) => void,
  setValue?: UseFormSetValue<any>
  error: boolean,
  errorMessage?:string
}

const IconInput = ({ icon, setIcon, setValue, error, errorMessage }: IconInputProps) => {

  const [choose, setChoose] = useState(false);
  const IconElement = icon ? useMUIIcon(icon) : null;


  const handleChooseClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setChoose(true)
  }

  const handleIconInputClick = 
  (key: string) => (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIcon(key)
    setChoose(false)
    if(setValue) {
      setValue("icon", key,{shouldValidate: true})
    }
  }

  return (
    <Stack width={choose ? "fit-content": "min-content" }>
      {error && <Typography variant="caption" textAlign="center" fontSize="11px" color="#d32f2f">{errorMessage}</Typography>}
      <Collapse in={!choose}>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          gap="2em"
          component={Paper}
          p={1}
        >
          <Avatar>
            {
              IconElement &&
              <IconElement />
            }
          </Avatar>
          <Stack
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Typography variant="subtitle2" display="block" gutterBottom>
              Icon
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleChooseClick}
            >
              Choose
            </Button>
          </Stack>
        </Stack>
      </Collapse>
      <Collapse in={choose}>
        <IconInputBox onIconClick={handleIconInputClick} />
      </Collapse>
    </Stack>
  )
}

export default IconInput
