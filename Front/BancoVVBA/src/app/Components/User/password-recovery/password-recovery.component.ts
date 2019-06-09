import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/User/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Modelos/user';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  user:User[];
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router,
    private toastr:ToastrService) { }

  formLogin=this.fb.group({
    Mail:['',Validators.required],
  });

  ngOnInit() {
    if(localStorage.getItem("currentUser")!=null){
      this.router.navigate(["/user/users"]);
    }
  }

  SendEmail(){
    this.userService.GetUserByMail(this.formLogin.value.Mail).subscribe(res=>{
      this.user=res;
      console.log(this.formLogin.value.Mail);
      console.log(this.user[0]);
      if(this.user[0]==undefined){
        this.toastr.error("Usuario no encontrado","Mail no existente");
      }else{
        console.log(this.formLogin.value.Mail);
        this.userService.PasswordRecovery(this.formLogin.value.Mail).subscribe(res=>{
          
          this.toastr.success("Compruebe su mail, le ha llegado un correo","Contraseña cambiada");
          this.router.navigate(["/user/login"]);

        });
      }

    });
  }
}
