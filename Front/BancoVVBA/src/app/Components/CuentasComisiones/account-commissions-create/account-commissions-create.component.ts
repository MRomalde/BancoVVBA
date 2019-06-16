import { Component, OnInit } from '@angular/core';
import { Commission } from 'src/app/Modelos/commission';
import { Account } from 'src/app/Modelos/account';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccountCommissionsService } from 'src/app/Services/AccountCommissions/account-commissions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/Services/Account/account.service';
import { CommissionService } from 'src/app/Services/Commission/commission.service';
import { AccountCommission } from 'src/app/Modelos/accountCommission';
import { User } from 'src/app/Modelos/user';

@Component({
  selector: 'app-account-commissions-create',
  templateUrl: './account-commissions-create.component.html',
  styleUrls: ['./account-commissions-create.component.css']
})
export class AccountCommissionsCreateComponent implements OnInit {

  accountCommission:AccountCommission;
  accounts:Account[];
  commissions:Commission[];
  commissionAux:Commission[];
  currentUser:User=JSON.parse(localStorage.getItem("currentUser"));
  constructor(private fb: FormBuilder, private accComService:AccountCommissionsService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute,private accService:AccountService,private comService:CommissionService) { }

    formModel=this.fb.group({
      SelectAccounts:['Elige una cuenta',[Validators.required]],
      SelectCommissions:['Elige una comision',[Validators.required]], 
    } , {validators:this.CommissionAlreadyTaken.bind(this)});

  ngOnInit() {
    if(this.currentUser.typeAccessId==2){
      this.router.navigate(["/user/myAccount"]);
    }
    this.GetAllAccountsAndCommissions();
  }

  GetAllAccountsAndCommissions(){
    this.accService.GetAllAccounts().subscribe(res=>{
      this.accounts=res;
    });
    this.comService.GetAllCommissions().subscribe(res=>{
      this.commissions=res;
    });
  }

  CreateAccountCommission(){
      //create the operation to add
          this.accountCommission=new AccountCommission(this.formModel.value.SelectAccounts,
            this.formModel.value.SelectCommissions);
      
          this.accComService.CreateAccountCommissions(this.accountCommission).subscribe(res=>{
            this.formModel.reset();
            this.toastr.success("Operacion creada con exito","Operacion creada");
            this.router.navigate(["/accountCommission/accountCommissions"])
          });
        
  }

  EnableSelectCommission(){
    //this take element with that id and ser his disabled atribute a true
    let select=document.getElementById("selectCom");
    select["disabled"]=false;
    //here we charge the select of accounts
    
  }
  CommissionAlreadyTaken(fb:FormGroup){
    var commissionControl=fb.get("SelectCommissions");
    var accountControl=fb.get("SelectAccounts");
    console.log(accountControl.value);
    this.accComService.AccountCommissionAlreadyTaken(accountControl.value,commissionControl.value).subscribe(data=>{
      if(data){
        fb.setErrors({commissionExist:true});
      }
      else{
        fb.setErrors(null);
      }
    })
  }
  
}
