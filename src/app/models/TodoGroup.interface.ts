import { TodoElement } from './TodoElement.interface';
export interface TodoGroup{
    _id:string;
    todos:TodoElement[];
}