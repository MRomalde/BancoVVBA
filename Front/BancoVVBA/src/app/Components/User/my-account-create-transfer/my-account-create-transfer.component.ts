import { Component, OnInit } from '@angular/core';
import { Operation } from 'src/app/Modelos/operation';
import { Account } from 'src/app/Modelos/account';
import { FormBuilder, Validators } from '@angular/forms';
import { OperationService } from 'src/app/Services/Operation/operation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/Services/Account/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Modelos/user';

@Component({
  selector: 'app-my-account-create-transfer',
  templateUrl: './my-account-create-transfer.component.html',
  styleUrls: ['./my-account-create-transfer.component.css']
})
export class MyAccountCreateTransferComponent implements OnInit {

  maxAmountToCreateOperation:number;
  accounts:Account[];
  acc:Account;
  operationToAdd:Operation;
  currentUser:User=JSON.parse(localStorage.getItem("currentUser"));

  constructor(private fb: FormBuilder, private operService:OperationService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute,private accService:AccountService) { }

    formModel=this.fb.group({
      SelectAccounts:['Elige una cuenta',[Validators.required]],
      Date:['',[Validators.required]],
      Amount:['',[Validators.required]],
      Message:['',],
    });

  ngOnInit() {
    this.GetAllAccountsExceptYours();
  }

  CreateTransfer(){
    //create the operation to add
      this.operationToAdd=new Operation(this.formModel.value.Date,"Entrada", this.formModel.value.Message,
      this.formModel.value.Amount, this.formModel.value.SelectAccounts);
    
      this.operService.CreateTrasfer(this.operationToAdd).subscribe(res=>{
        
        }); 
        this.accService.GetAccountByUserId(this.currentUser.userId).subscribe(res=>{
          this.acc=res[0];
          //create the operation to add
          this.operationToAdd=new Operation(this.formModel.value.Date,
            "Salida", this.formModel.value.Message,
            this.formModel.value.Amount,this.acc.accountId);
            
          this.operService.CreateTrasfer(this.operationToAdd).subscribe(res=>{
            this.formModel.reset();
            this.toastr.success("Transferencia creada con exito","Transferencia creada");
            this.router.navigate(["/user/myAccount"])
          }); 
      });
    }
  GetAllAccountsExceptYours(){
    if(this.currentUser==null || this.currentUser==undefined){
      this.router.navigate(["/user/login"]);
    }
    this.accService.GetAccountByUserId(this.currentUser.userId).subscribe(res=>{
      this.acc=res[0];
      this.accService.GetAllAccountsExceptYours(this.acc.accountId).subscribe(res=>{
        this.accounts=res;
      });
    });
  }

  EnableInputsDependOfSelectAccounts(){
    let inputsDependOfSelectAccount=document.getElementsByName("DependsOfSelectAccount");
    for (let i = 0; i < inputsDependOfSelectAccount.length; i++) {
      inputsDependOfSelectAccount[i]["disabled"]=false;      
    }
    this.GetMaxAmountOfTheOperation();  
  }

  GetMaxAmountOfTheOperation(){
    this.accService.GetAccountByUserId(this.currentUser.userId).subscribe(res=>{
      this.acc=res[0];
      this.maxAmountToCreateOperation=this.acc.balance;
      //first if some value changes, we add a validator, we cant add it in the form
      //because the initial value of the max amount is 0 and we need the value 
      //depending on the account, for that we set the validator after
      this.formModel.valueChanges.subscribe(checked => {
        if (checked) {
          this.formModel.controls.Amount.setValidators([Validators.required, Validators.max(this.maxAmountToCreateOperation),Validators.min(0.1)]);
        } else {
          this.formModel.controls.Amount.setValidators(null);
        }
        this.formModel.controls.Amount.updateValueAndValidity();
      });

    });
  }

}
