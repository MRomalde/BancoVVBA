import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User/user.service';
import { User } from 'src/app/Modelos/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList: User[];
  numberOfAdmins:Number;
  userToDelete:User;
  p:number=1;
  constructor(private userService:UserService,private toastr:ToastrService) { }

  ngOnInit() {
    this.GetUsers();
  }

  GetUsers(){
    this.userService.GetAllUsers().subscribe(Users=>{
      this.userList=Users;
    });
    
  }
  DeleteUser(user:User){
    
    this.userService.GetUserById(user.userId).subscribe(res=>{
    this.userToDelete=JSON.parse(localStorage.getItem("currentUser"));
    console.log(JSON.parse(localStorage.getItem("currentUser")));
    console.log(user);
      if(user.typeAccessId==1){
        if(user.userId==this.userToDelete.userId)
          this.toastr.error("No se puede borrar a uno mismo","Borrado incompleto");
        else{
          this.userList=this.userList.filter(u=>u!==user);
          this.userService.DeleteUser(user.userId).subscribe(res=>this.toastr.info("Usuario borrado","Borrado"));
        }
    }
    else{
      this.userList=this.userList.filter(u=>u!==user);
      this.userService.DeleteUser(user.userId).subscribe(res=>this.toastr.info("Usuario borrado","Borrado"));
    }
    })
  }

}
