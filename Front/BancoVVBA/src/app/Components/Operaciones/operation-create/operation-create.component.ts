import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/Modelos/account';
import { OperationService } from 'src/app/Services/Operation/operation.service';
import { AccountService } from 'src/app/Services/Account/account.service';
import { Operation } from 'src/app/Modelos/operation';

@Component({
  selector: 'app-operation-create',
  templateUrl: './operation-create.component.html',
  styleUrls: ['./operation-create.component.css']
})
export class OperationCreateComponent implements OnInit {

  maxAmountToCreateOperation:number;
  accounts:Account[];
  acc:Account;
  operationToAdd:Operation;

  constructor(private fb: FormBuilder, private operService:OperationService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute,private accService:AccountService) { }

    formModel=this.fb.group({
      SelectConcepto:['Elige un concepto',[Validators.required]],
      SelectAccounts:['Elige una cuenta',[Validators.required]],
      Date:['',[Validators.required]],
      Amount:['',],
      Message:['',],
    });
  ngOnInit() {
    
  }

  CreateOperation(){
//create the operation to add
    this.operationToAdd=new Operation(this.formModel.value.Date,
      this.formModel.value.SelectConcepto, this.formModel.value.Message,
      this.formModel.value.Amount, this.formModel.value.SelectAccounts);

    this.operService.CreateOperation(this.operationToAdd).subscribe(res=>{
      this.formModel.reset();
      this.toastr.success("Operacion creada con exito","Operacion creada");
      this.router.navigate(["/operation/operations"])
    });
  }
  EnableSelectAccounts(){
    //this take element with that id and ser his disabled atribute a true
    let select=document.getElementById("selectAcc");
    select["disabled"]=false;
    //here we charge the select of accounts
    this.accService.GetAllAccounts().subscribe(res=>{
      this.accounts=res;
    });
    if(this.formModel.value.SelectAccounts!='Elige una cuenta'){
      this.GetMaxAmountOfTheOperation();
    }
  }
  EnableInputsDependOfSelectAccounts(){
    let inputsDependOfSelectAccount=document.getElementsByName("DependsOfSelectAccount");
    for (let i = 0; i < inputsDependOfSelectAccount.length; i++) {
      inputsDependOfSelectAccount[i]["disabled"]=false;      
    }
    this.GetMaxAmountOfTheOperation();  
  }

  GetMaxAmountOfTheOperation(){
    this.accService.GetAccountById(this.formModel.value.SelectAccounts).subscribe(res=>{
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
