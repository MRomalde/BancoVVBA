import { Component, OnInit } from '@angular/core';
import { Operation } from 'src/app/Modelos/operation';
import { Account } from 'src/app/Modelos/account';
import { User } from 'src/app/Modelos/user';
import { FormBuilder, Validators } from '@angular/forms';
import { OperationService } from 'src/app/Services/Operation/operation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/Services/Account/account.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-account-details',
  templateUrl: './my-account-details.component.html',
  styleUrls: ['./my-account-details.component.css']
})
export class MyAccountDetailsComponent implements OnInit {

  maxAmountToCreateOperation:number;
  currentOperation:Operation[];
  acc:Account;
  accounts:Account[];
  date:string;
  currentUser:User=JSON.parse(localStorage.getItem("currentUser"));
  
  constructor(
    private fb: FormBuilder, private operService:OperationService,private router:Router,
      private toastr:ToastrService,private route: ActivatedRoute,private accService:AccountService,
      private datePipe: DatePipe) { }

      formModel=this.fb.group({
        SelectConcepto:['',[Validators.required]],
        Date:['',[Validators.required]],
        Amount:['',],
        Message:['',],
      });
      
  ngOnInit() {
    this.GetCurrentOperation();
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

  UpdateOperation(){
    this.operService.UpdateOperation(this.currentOperation[0]).subscribe(res=>{
      this.formModel.reset();
      this.toastr.success("Operacion editada con exito","Operacion editada");
      this.router.navigate(["/user/myAccount"])
    });  
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
