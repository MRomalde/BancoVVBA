import { Component, OnInit } from '@angular/core';
import { AccountCommissionsService } from 'src/app/Services/AccountCommissions/account-commissions.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/Services/Account/account.service';
import { FormBuilder } from '@angular/forms';
import { AccountCommission } from 'src/app/Modelos/accountCommission';
import { Router } from '@angular/router';
import { User } from 'src/app/Modelos/user';

@Component({
  selector: 'app-account-commissions',
  templateUrl: './account-commissions.component.html',
  styleUrls: ['./account-commissions.component.css']
})
export class AccountCommissionsComponent implements OnInit {

  accounts:Account[];
  accountCommissions:AccountCommission[];
  accountId:number;
  p:number=1;
  currentUser:User=JSON.parse(localStorage.getItem("currentUser"));

  constructor(private accComService:AccountCommissionsService,private toastr:ToastrService,
    private fb:FormBuilder,private accService:AccountService,private router:Router) { }

    formModel=this.fb.group({
      selectAccounts:['Todos']
    });

  ngOnInit() {
    if(this.currentUser.typeAccessId==2){
      this.router.navigate(["/user/myAccount"]);
    }
    this.GetAllAccountsToLoadSelect();
  }

  GetAllAccountsToLoadSelect(){
    this.accService.GetAllAccounts().subscribe(res=>{
      this.accounts=res;
      this.GetAccountCommissionsByAccountId();
   });
   }

   GetAccountCommissionsByAccountId(){
    if(this.formModel.value.selectAccounts=="Todos"){
      this.accComService.GetAllAccountCommissions().subscribe(res=>{
        this.accountCommissions=res;
      });
    }
    else{
      this.accountId=this.formModel.value.selectAccounts;
      this.accComService.GetAccountCommissionsByAccountId(this.accountId).subscribe(res=>{
        this.accountCommissions=res;
      });
    }
  }

  DeleteAccountCommission(accCom:AccountCommission){
    this.accountCommissions=this.accountCommissions.filter(o=>o!==accCom);
    this.accComService.DeleteAccountCommissions(accCom.accountsHasCommissionsId).subscribe(res=>this.toastr.info("Operacion borrada","Borrar"));
  }
}
