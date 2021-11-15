import { Stack, Typography, Rating, CircularProgress } from '@mui/material'
import React, { useState, useCallback } from 'react'
import { rate } from '../../services/RateService'
import { useMutation, useQueryClient } from 'react-query'
import { RatingValueProps } from './types'

const RatingValue = ({ property: { name, id, value}, vehicleId }: RatingValueProps) => {

  const [rateValue, setRateValue] = useState(value ? value.value : null)
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(['ratings', vehicleId], async (value:number) => {
    const result = await rate({
      value,
      vehicle_FK: vehicleId,
      vehicle_property_FK: id
    })

    return result.data
  },{
    onSuccess: (data, variables) => {
      setRateValue(variables)
      queryClient.invalidateQueries(["ratings", vehicleId.toString()])
    }
  })

  const onValueChange = useCallback(
    (event:React.SyntheticEvent<Element, Event>, newValue: number | null) => {
    mutate(newValue ? newValue : 1);
  },[])

  
  return (
    <Stack
    direction="row"
    >
      <Stack
      direction="column"
      >
        <Typography>
          {name}
        </Typography>
        <Rating
          value={rateValue}
          onChange={onValueChange}
          disabled={isLoading}
        />
      </Stack>
      <Stack width="1em">
        {
          isLoading &&
          <CircularProgress size="1em" sx={{
            display: "block",
            my: "auto"
          }}
          disableShrink/>
        }
      </Stack>
    </Stack>
  )
}

export default RatingValue
