import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/Modelos/account';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OperationService } from 'src/app/Services/Operation/operation.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/Services/Account/account.service';
import { Operation } from 'src/app/Modelos/operation';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  accountSelected:string="0";
  accounts:Account[];
  operations:Operation[];
  accountId:number;
  p:number=1;
  constructor(private operService:OperationService,private toastr:ToastrService,
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
     this.GetOpersByAccountId();
  });
  }

  GetOpersByAccountId(){
    if(this.formModel.value.selectAccounts=="Todos"){
      this.operService.GetAllOperations().subscribe(res=>{
        this.operations=res;
      });
    }
    else{
      this.accountId=this.formModel.value.selectAccounts;
      this.operService.GetOperationsByAccountId(this.accountId).subscribe(res=>{
        this.operations=res;
      });
    }
  }
  
  DeleteOper(oper:Operation){
    this.operations=this.operations.filter(o=>o!==oper);
          this.operService.DeleteOper(oper.operationId).subscribe(res=>this.toastr.info("Operacion borrada","Borrar"));
  }
}
