import { LoginData } from "./LoginData.interface";

export interface RegisterData extends LoginData{
  firstName:string;
  lastName:string;
}
