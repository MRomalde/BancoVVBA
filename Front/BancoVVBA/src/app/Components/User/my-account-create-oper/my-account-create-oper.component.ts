import { Component, OnInit } from '@angular/core';
import { Operation } from 'src/app/Modelos/operation';
import { FormBuilder, Validators } from '@angular/forms';
import { OperationService } from 'src/app/Services/Operation/operation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/Services/Account/account.service';
import { User } from 'src/app/Modelos/user';
import { Account } from 'src/app/Modelos/account';

@Component({
  selector: 'app-my-account-create-oper',
  templateUrl: './my-account-create-oper.component.html',
  styleUrls: ['./my-account-create-oper.component.css']
})
export class MyAccountCreateOperComponent implements OnInit {

  maxAmountToCreateOperation:number;
  operationToAdd:Operation;
  currentUser:User=JSON.parse(localStorage.getItem("currentUser"))
  acc:Account;

  constructor(private fb: FormBuilder, private operService:OperationService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute,private accService:AccountService) { }


    formModel=this.fb.group({
      SelectConcepto:['Elige un concepto',[Validators.required]],
      Date:['',[Validators.required]],
      Amount:['',[Validators.required]],
      Message:['',],
    });
    
  ngOnInit() {

  }

  CreateOperation(){
    this.accService.GetAccountByUserId(this.currentUser.userId).subscribe(res=>{
      this.acc=res[0];
      //create the operation to add
      this.operationToAdd=new Operation(this.formModel.value.Date,
        this.formModel.value.SelectConcepto, this.formModel.value.Message,
        this.formModel.value.Amount,this.acc.accountId);
        
        this.operService.CreateOperation(this.operationToAdd).subscribe(res=>{
          this.formModel.reset();
          this.toastr.success("Operacion creada con exito","Operacion creada");
          this.router.navigate(["/user/myAccount"])
        });
    });  
        
  }

  EnableInputs(){
    let inputsDependOfSelectAccount=document.getElementsByName("DependsOfSelectAccount");
    for (let i = 0; i < inputsDependOfSelectAccount.length; i++) {
      inputsDependOfSelectAccount[i]["disabled"]=false;      
    }
    this.GetMaxAmountOfTheOperation();  
  }
  GetMaxAmountOfTheOperation(){
    this.accService.GetAccountByUserId(this.currentUser.userId).subscribe(res=>{
      this.acc=res[0];
      if(this.formModel.value.SelectConcepto=="Entrada"){
        this.maxAmountToCreateOperation=999999999-this.acc.balance;
      }
      else{
        this.maxAmountToCreateOperation=this.acc.balance;
      }
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
