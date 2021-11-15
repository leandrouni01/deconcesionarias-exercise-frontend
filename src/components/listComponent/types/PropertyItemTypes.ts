import VehicleProperty from "../../../models/VehicleProperty";

export type PropertyItemProps = {
  data: VehicleProperty,
  onDelete: (id:number) => (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}