import { Component, OnInit } from '@angular/core';
import { Operation } from 'src/app/Modelos/operation';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationService } from 'src/app/Services/Operation/operation.service';
import { AccountService } from 'src/app/Services/Account/account.service';
import { Account } from 'src/app/Modelos/account';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-operation-details',
  templateUrl: './operation-details.component.html',
  styleUrls: ['./operation-details.component.css']
})
export class OperationDetailsComponent implements OnInit {

  maxAmountToCreateOperation:number;
  currentOperation:Operation[];
  acc:Account;
  accounts:Account[];
  date:string;

  constructor(private fb: FormBuilder, private operService:OperationService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute,private accService:AccountService,
    private datePipe: DatePipe) { }

  formModel=this.fb.group({
    SelectConcepto:['',[Validators.required]],
    SelectAccounts:['',[Validators.required]],
    Date:['',[Validators.required]],
    Amount:['',],
    Message:['',],
  });

  ngOnInit() {   
    this.accService.GetAllAccounts().subscribe(res=>{
      this.accounts=res;
    });
    this.GetCurrentOperation();

  }

  UpdateOperation(){
    this.currentOperation[0].date=this.formModel.value.Date;
    this.operService.UpdateOperation(this.currentOperation[0]).subscribe(res=>{
      this.toastr.success("Operacion editada con exito","Editar operacion");
      this.router.navigate(["/operation/operations"]);
    });
  }


  GetCurrentOperation(){
    var operId=+this.route.snapshot.paramMap.get("id");
    this.operService.GetOperationByOperId(operId).subscribe(res=>{
      //its a list because is Async
      this.currentOperation=res;
      this.date=this.datePipe.transform(this.currentOperation[0].date,"yyyy-MM-dd");      
      this.GetMaxAmountOfTheOperationFirst();
    });
  }

  EnableSelectAccounts(){
    //here we charge the select of accounts
    this.accService.GetAllAccounts().subscribe(res=>{
      this.accounts=res;  
    });
    if(this.formModel.value.SelectAccounts!='Elige una cuenta'){
      this.GetMaxAmountOfTheOperation();
    }
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

  //first the form is empty so to have the validations we need to look at the 
  //account id that is the same of the select, and if the select change we call
  //the other method
  GetMaxAmountOfTheOperationFirst(){
    this.accService.GetAccountById(this.currentOperation[0].accountId).subscribe(res=>{
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
