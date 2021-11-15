export type VehicleRatingProps = {
  data: CategoryWithPropertiesAndValues[],
  vehicleId:number
}

export type RatingValueProps = {
  property: VehiclePropertyWithValue,
  vehicleId:number
}

export interface PropertyValue {
  value: number,
  vehicle_FK: number,
  vehicle_property_FK: number
}

export interface VehiclePropertyWithValue {
  id:number,
  name:string,
  value: PropertyValue | null
} 

export interface CategoryWithPropertiesAndValues {
  id:number,
  name:string,
  icon:string,
  vehicle_properties: VehiclePropertyWithValue[]
}
