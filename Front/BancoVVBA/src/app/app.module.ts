import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/User/login/login.component';
import { NavBarComponent } from './Components/NavBar/nav-bar/nav-bar.component';
import { UsersComponent } from './Components/User/users/users.component';
import { OperationsComponent } from './Components/Operaciones/operations/operations.component';
import { AccountsComponent } from './Components/Cuentas/accounts/accounts.component';
import { CommissionsComponent } from './Components/Comisiones/commissions/commissions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { RegisterComponent } from './Components/User/register/register.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { MyAccountComponent } from './Components/User/my-account/my-account.component';
import { UserDetailsComponent } from './Components/User/user-details/user-details.component';
import { SearchComponent } from './Components/User/search/search.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { UserCreateComponent } from './Components/User/user-create/user-create.component';
import { AccountDetailsComponent } from './Components/Cuentas/account-details/account-details.component';
import { AccountSearchComponent } from './Components/Cuentas/account-search/account-search.component';
import { OperationDetailsComponent } from './Components/Operaciones/operation-details/operation-details.component';
import { OperationCreateComponent } from './Components/Operaciones/operation-create/operation-create.component'
import {NgxPaginationModule} from 'ngx-pagination';
import {DatePipe} from '@angular/common';
import { CommissionDetailsComponent } from './Components/Comisiones/commission-details/commission-details.component';
import { CommissionCreateComponent } from './Components/Comisiones/commission-create/commission-create.component';
import { AccountCommissionsComponent } from './Components/CuentasComisiones/account-commissions/account-commissions.component';
import { AccountCommissionsCreateComponent } from './Components/CuentasComisiones/account-commissions-create/account-commissions-create.component';
import { MyAccountDetailsComponent } from './Components/User/my-account-details/my-account-details.component';
import { MyAccountCreateOperComponent } from './Components/User/my-account-create-oper/my-account-create-oper.component';
import { MyAccountCreateTransferComponent } from './Components/User/my-account-create-transfer/my-account-create-transfer.component';
import { PasswordRecoveryComponent } from './Components/User/password-recovery/password-recovery.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    UsersComponent,
    OperationsComponent,
    AccountsComponent,
    CommissionsComponent,
    RegisterComponent,
    MyAccountComponent,
    UserDetailsComponent,
    SearchComponent,
    UserCreateComponent,
    AccountDetailsComponent,
    AccountSearchComponent,
    OperationDetailsComponent,
    OperationCreateComponent,
    CommissionDetailsComponent,
    CommissionCreateComponent,
    AccountCommissionsComponent,
    AccountCommissionsCreateComponent,
    MyAccountDetailsComponent,
    MyAccountCreateOperComponent,
    MyAccountCreateTransferComponent,
    PasswordRecoveryComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ConfirmationPopoverModule.forRoot({confirmButtonType: 'danger'}),
    NgxPaginationModule,

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
