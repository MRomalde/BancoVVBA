import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/Modelos/account';
import { AccountService } from 'src/app/Services/Account/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accountList:Account[];
  constructor(private accService:AccountService) { }

  ngOnInit() {
    this.GetAllAccounts();
  }
  GetAllAccounts(){
    this.accService.GetAllAccounts().subscribe(res=>this.accountList=res);
  }

}
