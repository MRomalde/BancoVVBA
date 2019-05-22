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


    public constructor(surnameName:string,alias:string,login:string,password:string,
        dni:string,telephone:string,mail:string)
    {
        this.SurnameName=surnameName;
        this.Alias=alias;
        this.Login=login;
        this.Password=password;
        this.Dni=dni;
        this.Telephone=telephone;
        this.Mail=mail;
        this.TypeAccessId=3;
    }
}

