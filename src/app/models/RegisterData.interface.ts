import { LoginData } from "./LoginData.interface";

export interface RegisterData extends LoginData{
  firstname:string;
  lastname:string;
  email:string;
  password:string;
}
