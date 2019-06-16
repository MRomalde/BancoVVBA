import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/Services/Account/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/Modelos/account';
import { User } from 'src/app/Modelos/user';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  account:Account[];
  currentUser:User=JSON.parse(localStorage.getItem("currentUser"));
  constructor(private fb: FormBuilder, private accService:AccountService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute,) { }

    formModel=this.fb.group({
      Balance:['',[Validators.required,Validators.min(0),Validators.max(999999999)]],
      Iban:['',[Validators.required]],
    });


  ngOnInit() {
    if(this.currentUser.typeAccessId==2){
      this.router.navigate(["/user/myAccount"]);
    }
    this.GetAccountById();
  }

  GetAccountById(){
    var accountId=+this.route.snapshot.paramMap.get('id');
    this.accService.GetAccountById(accountId).subscribe(res=>{
      this.account=res;
      console.log(this.account);
    });
  }

  Save(){
    this.accService.UpdateAccount(this.account[0]).subscribe(()=>{
      this.toastr.success("Cuenta editada con exito","Editar cuenta");
      this.router.navigate(["/account/accounts"]);
    });
  }
}
