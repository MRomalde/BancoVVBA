import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Modelos/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit,OnChanges {
  title="Banco VVBA";
  userIsLogged:boolean=false;
  userRol:string;
  user:User;
  counter:number;
  constructor(private router:Router) { }


  ngOnInit() {
    this.CheckIfUserIsLogged();
    //Need to refresh the component
  }
  
  ngOnChanges(){
    //need to refresh
    location.reload();
  }
  Logout(){
    localStorage.removeItem("currentUser");
    this.router.navigate(["/user/login"]);
  }

  CheckIfUserIsLogged(){
    if(localStorage.getItem("currentUser")==null)
      this.userIsLogged=false;
    else{
      this.userIsLogged=true;
      this.user=JSON.parse(localStorage.getItem("currentUser"));
      console.log(this.user);
    
    }
    console.log(this.userIsLogged);
  }

}
