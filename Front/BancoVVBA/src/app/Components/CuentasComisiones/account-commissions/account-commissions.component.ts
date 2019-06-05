import { Component, OnInit } from '@angular/core';
import { AccountCommissionsService } from 'src/app/Services/AccountCommissions/account-commissions.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/Services/Account/account.service';
import { FormBuilder } from '@angular/forms';
import { AccountCommission } from 'src/app/Modelos/accountCommission';

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

  constructor(private accComService:AccountCommissionsService,private toastr:ToastrService,
    private fb:FormBuilder,private accService:AccountService) { }

    formModel=this.fb.group({
      selectAccounts:['Todos']
    });

  ngOnInit() {
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
