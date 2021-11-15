import { Stack, Tabs, Tab, Box, Paper } from '@mui/material'
import CustomTab from './CustomTab'
import React from 'react'
import RatingValue from './RatingValue'
import { VehicleRatingProps, VehiclePropertyWithValue } from './types'


const VehicleRatings = ({ data, vehicleId }: VehicleRatingProps) => {
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack direction="row"
      sx={{
        height: "65vh",
        mt: 0,
        width: "100%"
      }}
      component={Paper}
    >
      <Tabs
        value={value}
        variant="scrollable"
        onChange={handleChange}
        scrollButtons
        allowScrollButtonsMobile
        orientation="vertical"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {
          data.map((d: any) =>
            <Tab key={d.id} label={<CustomTab icon={d.icon} label={d.name} />} />
          )
        }
      </Tabs>
      <Stack 
      flexGrow={1}
      flexWrap="wrap"
      gap="0.2em"
      p="2em"
      component={
        Box
      }
      >
        {
          data[value].vehicle_properties.map(
            (v:VehiclePropertyWithValue) => <RatingValue key={v.id} property={v} vehicleId={vehicleId}/>
            )
        }
      </Stack>
    </Stack>
  )
}

export default VehicleRatings
