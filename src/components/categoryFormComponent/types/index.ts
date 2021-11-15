 export interface ICategoryForm {
  name: string
  icon: string
}

export interface CategoryFormComponentProps {
  categoryValues?: {
    id:number
    name: string
    icon: string
  }
}