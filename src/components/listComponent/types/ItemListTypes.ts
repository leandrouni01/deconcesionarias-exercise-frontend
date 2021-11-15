import React from "react";
import BaseModel from "../../../models/BaseModel";

type DeleteFunction = 
 (id:number, callback?: () => any) => (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

export type ItemListProps<T extends BaseModel> = {
  items: T[],
  ItemComponent: React.FC<{data:T, onDelete:DeleteFunction}>,
  subHeaderTitle: string,
  onDelete:DeleteFunction
}