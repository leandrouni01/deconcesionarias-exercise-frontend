import React, { useEffect, useState } from 'react'
import { Stack, IconButton, Pagination, Paper } from '@mui/material'
import * as Icons from '@mui/icons-material'

function getDefaultIconKeys():string[] {
  const regex = /(Outlined|Rounded|Sharp|TwoTone)$/
  return Object.keys(Icons).filter(key =>
    !regex.test(key)
  );
}

type IconInputBoxProps = {
  onIconClick: (key:string) => (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const defaultIconKeys = getDefaultIconKeys();

const IconInputBox = (props:IconInputBoxProps) => {

  const [icons, setIcons] = useState<JSX.Element[]>([]);
  useEffect(() => {
    changeIcons(1);
  }, [])

  const { onIconClick } = props;

  const iconsPerPage = 25;
  

  const handleChange = (e:React.ChangeEvent<any>, page:number) => {
    changeIcons(page)
  }

  const changeIcons = (page:number) => {
    const newIconKeys = defaultIconKeys.slice(
    page * iconsPerPage - iconsPerPage, page * iconsPerPage );
    setIcons(() => {

      const newIcons = newIconKeys.map((key:string) => {
        const CurrentIcon = (Icons as any)[key];
        return (
          <IconButton key={key}
          onClick={onIconClick(key)}
          >
            <CurrentIcon />
          </IconButton>
        )
      })
      
      return newIcons
    })
  }

  return (
    <Stack 
    justifyContent="space-evenly"
    alignItems="center"
    gap={2}
    >
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        flexWrap="wrap"
        width={["80%", "70%", "50%"]}
        height="10em"
        overflow="auto"
        component={Paper}
      >
        {icons}
      </Stack>
      <Pagination 
      count={Math.ceil(defaultIconKeys.length / iconsPerPage)} 
      onChange={handleChange}
      size="small"
      />
    </Stack>
  )
}

export default IconInputBox
