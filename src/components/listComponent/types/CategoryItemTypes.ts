export type CategoryItemProps = {
  data: {
    icon: string,
    name: string
    id: number
  },
  onDelete: (id:number) => (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}