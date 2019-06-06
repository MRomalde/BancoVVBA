import { Component, OnInit } from '@angular/core';
import { OperationService } from 'src/app/Services/Operation/operation.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/Services/Account/account.service';
import { User } from 'src/app/Modelos/user';
import { Operation } from 'src/app/Modelos/operation';
import { Account } from 'src/app/Modelos/account';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  currentUser:User=JSON.parse(localStorage.getItem("currentUser"));
  operations:Operation[];
  account:Account[];

  constructor(private operService:OperationService,private toastr:ToastrService,
    private accService:AccountService) { }

  ngOnInit() {
    this.GetAllOperationsByUserId();
  }
  GetAllOperationsByUserId() {
    console.log(this.currentUser);
    this.accService.GetAccountByUserId(this.currentUser.userId).subscribe(res=>{
    this.account=res;
    
    //call the api inside this subscribe to use the account
    this.operService.GetOperationsByAccountId(this.account[0].accountId).subscribe(res=>{
      this.operations=res;
    });
    });
  }

}
