export type VehicleItemProps = {
  data: {
    name: string
    id: number
  },
  onDelete: (id:number) => (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}