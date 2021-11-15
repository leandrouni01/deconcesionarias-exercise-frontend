
export interface IPropertyForm {
  name: string
  property_category_FK:number
}

export interface PropertyFormComponentProps {
  propertyValues?: {
    id:number
    name: string
    property_category_FK:number
  }
}