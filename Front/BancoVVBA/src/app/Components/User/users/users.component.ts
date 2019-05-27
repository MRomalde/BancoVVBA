import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User/user.service';
import { User } from 'src/app/Modelos/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList: User[];
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.GetUsers();
  }

  GetUsers(){
    this.userService.GetAllUsers().subscribe(Users=>{
      this.userList=Users;
    });
    
  }

}
