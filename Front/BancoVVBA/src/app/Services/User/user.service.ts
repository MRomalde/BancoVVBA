import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from 'src/app/Modelos/user';
import { LoginModel } from 'src/app/Modelos/loginModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  Uri="https://localhost:5001/api/user";
  constructor(private http: HttpClient) { }
  //Server Validators
  DniExistInDb(dni:string):Observable<any>{
    return this.http.get(this.Uri + "/checkIfDniExistInDb/"+ dni).pipe(catchError(this.handleError<any>('dniExist',[])));
  }
  LoginExistInDb(login:string):Observable<any>{
    return this.http.get(this.Uri + "/checkIfLoginExistInDb/"+ login).pipe(catchError(this.handleError<any>('loginExist',[])));
  }
  EmailExistInDb(email:string):Observable<any>{
    return this.http.get(this.Uri + "/checkIfEmailExistInDb/"+ email).pipe(catchError(this.handleError<any>('emailExist',[])));
  }
  AliasExistInDb(alias:string):Observable<any>{
    return this.http.get(this.Uri+ "/CheckIfAliasExistInDb/"+ alias,{responseType:'text'}).pipe(catchError(this.handleError<any>('AliasExist',[])));
  }
  //Register
  CreateUserFromRegister(user:User):Observable<any>{
    return this.http.post(this.Uri+ "/register",user,httpOptions).pipe(catchError(this.handleError<any>('register',[])));
  }
  //Login
  Login(loginModel:LoginModel):Observable<any>{
    return this.http.post(this.Uri + "/login",loginModel,httpOptions).pipe(catchError(this.handleError<any>('login',[])));
  }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
private log(message: string) {
 console.log(message);
}
}
