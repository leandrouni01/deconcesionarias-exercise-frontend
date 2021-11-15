import BaseModel from "./BaseModel";
import Category from "./Category";

type VehicleProperty = BaseModel & {
  name:string
  property_category_FK:number
  property_category?: Category
}

export default VehicleProperty;