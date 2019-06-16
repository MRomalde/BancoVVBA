import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/Services/User/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersTypeAccess } from 'src/app/Modelos/UsersTypeAccess';
import { User } from 'src/app/Modelos/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  alias:string=null;
  aliasExistInDb:boolean=true;
  typeUserSelected:string="0";
  typeUserAccessList:UsersTypeAccess[];
  user:User[];
  nameOfUser:string;
  surnameOfUser:string;
  dniOfUser:string;
  mailOfUser:string;
  loginOfUser:string;
  userAux:User=JSON.parse(localStorage.getItem("currentUser"));
  canChangeUserTypeAccess:Boolean=true;


  constructor(private fb: FormBuilder, private userService:UserService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute,) { }

    formModel=this.fb.group({
      Name:['',[Validators.required]],
      Surname:['',[Validators.required]],
      Email:['',[Validators.required,Validators.email],[this.EmailExistInDb.bind(this)]],
      Telephone:['',[Validators.required,Validators.min(600000000),Validators.max(799999999)]],
      Dni:['',[Validators.required],[this.DniExistInDb.bind(this)]],
      UserName:['',[Validators.required],[this.LoginExistInDb.bind(this)]],
      Passwords:this.fb.group({
        Password:['',[Validators.required]],
        ConfirmPassword:['',Validators.required]
    },{validator:this.ComparePasswords}),
    //the number one is a default value
    UserTypeAccess:[1,Validators.required]
    });


  ngOnInit() {
    if(this.userAux.typeAccessId==2){
      this.router.navigate(["/user/myAccount"]);
    }
    this.canChangeUserTypeAccess==true;
    this.GetAllUserTypeAccess();
    this.GetUserById();
  }
  GetUserById() {
    const userId=+this.route.snapshot.paramMap.get("id");
    this.userService.GetUserById(userId).subscribe(userList=>{
      this.user=userList;
      console.log(this.user);
      //we have to do it with strings instead of an user aux because the copy 
      //of objects are a reference copy not a value copy so if i have an user
      //aux, the control and the value of the user its the same all the time
      this.dniOfUser=this.user[0].dni;
      this.mailOfUser=this.user[0].mail;
      this.loginOfUser=this.user[0].login;
      this.nameOfUser=this.user[0].surnameName.split(',')[1];
      this.surnameOfUser=this.user[0].surnameName.split(',')[0];
      this.CantChangeUserTypeAccess(this.dniOfUser);
    });
  }

  GetAllUserTypeAccess(){
    this.userService.GetAllUserTypeAccess().subscribe(res=>this.typeUserAccessList=res);
  }

  ComparePasswords(fb:FormGroup){
    var confirmPasswordControl=fb.get("ConfirmPassword");
    if(confirmPasswordControl.errors==null|| 'passwordMismatch' in confirmPasswordControl.errors){
      if(fb.get("Password").value!=confirmPasswordControl.value)
        confirmPasswordControl.setErrors({passwordMismatch:true});
      else
        confirmPasswordControl.setErrors(null);
    }
  }

  CantChangeUserTypeAccess(dni:string){
    if(this.userAux.dni==dni){     
      this.canChangeUserTypeAccess=false;
    }
  }
  DniExistInDb(fb:FormGroup){
    return new Promise(res=>{
    var dniControlValue=fb.value;
    this.userService.DniExistInDb(dniControlValue).subscribe(data=>{
      if(data && this.user[0].dni!=this.dniOfUser){       
        fb.setErrors({DniExist:true});
      }
      else{
        fb.setErrors(null);
      }
    })
  })
  }

  LoginExistInDb(fb:FormGroup){
    return new Promise(res=>{
      var loginControlValue=fb.value;
      this.userService.LoginExistInDb(loginControlValue).subscribe(data=>{
        if(data && this.user[0].login!=this.loginOfUser)
          fb.setErrors({LoginExist:true});
        else
          fb.setErrors(null);
      })

    })
  }

  EmailExistInDb(fb:FormGroup){
    return new Promise(res=>{
      var emailControlValue=fb.value;
      this.userService.EmailExistInDb(emailControlValue).subscribe(data=>{
        if(data && this.user[0].mail!=this.mailOfUser)
          fb.setErrors({EmailExist:true});
        else
          fb.setErrors(null);
      })

    })
  }
  Save(){
    this.user[0].surnameName=this.surnameOfUser+","+this.nameOfUser;
    this.alias=this.user[0].surnameName.substring(0,2) + this.user[0].surnameName.substring(this.user[0].surnameName.length-2);
    this.userService.AliasExistInDb(this.alias).subscribe(data=>{
      this.alias=data;
      this.user[0].alias=this.alias;
    //call to the service to update user
    this.userService.UpdateUser(this.user[0]).subscribe((res:any)=>{
      //find the user created and then create his account  in the back
      this.formModel.reset();
      this.toastr.success("El usuario ha sido cambiado","Editado con exito");
      this.router.navigate(["/user/users"]);
    },
    err=>{console.log(err)});
  })
  }




}
