import { UsersTypeAccess } from './UsersTypeAccess';
export class User{
    UserId:number;
    SurnameName:string;
    Alias:string;
    Login:string;
    Password:string;
    Dni:string;
    Telephone:string;
    Mail:string
    TypeAccessId:number;
    TypeAccess:UsersTypeAccess;
}