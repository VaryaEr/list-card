
import { Card as CardInterface } from "./card";
export interface List {
    id: number,
    sort: number,
    name: string,
    code: string,
    cards?: CardInterface[] | null
  }