import { AxiosResponse } from 'axios';
import AxiosService from './AxiosInstance'
const axiosInstance = AxiosService.pbAxios

type rateData = {
  value:number,
  vehicle_property_FK:number,
  vehicle_FK:number
}

export const rate = async ({value, vehicle_property_FK, vehicle_FK}:rateData):Promise<AxiosResponse> => {
  const rating = {
    value,
    vehicle_property_FK
}
  return await axiosInstance.post('/ratings/' + vehicle_FK, rating)
}