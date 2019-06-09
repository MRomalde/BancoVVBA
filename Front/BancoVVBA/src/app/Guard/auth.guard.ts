import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { User } from '../Modelos/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;
  
  user:User=JSON.parse(localStorage.getItem("currentUser"));
  constructor(private router:Router){

  }
  canActivate(){
    if(this.user!=null || this.user!=undefined){
      return true;
    }else{
      this.router.navigate(["/user/login"]);
      return false;
    }
  }
}
