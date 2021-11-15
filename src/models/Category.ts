import BaseModel from "./BaseModel";

type Category = BaseModel & {
  name:string
  icon:string
}

export default Category;