import { AxiosResponse } from 'axios';
import AxiosService from './AxiosInstance'
const axiosInstance = AxiosService.pbAxios

export const getItemAll = async <T>(url:string):Promise<AxiosResponse<T[]>> => {
  return await axiosInstance.get(url);
}

export const getItemById = async <T>(url:string):Promise<AxiosResponse<T>> => {
  return await axiosInstance.get(url);
}

export const createItem = async <T>(url:string, data:T):Promise<AxiosResponse<T>> => {
  return await axiosInstance.post(url,data);
}

export const updateItem = async <T>(url:string, data:T):Promise<AxiosResponse<T>> => {
  return await axiosInstance.put(url, data);
}

export const deleteItem = async <T>(url:string):Promise<AxiosResponse<boolean>> => {
  return await axiosInstance.delete(url);
}