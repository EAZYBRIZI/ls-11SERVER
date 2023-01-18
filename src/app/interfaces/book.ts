import {IAuthor} from "./author";

export interface IBook {
  id: string;
  name: string;
  author: IAuthor;
}