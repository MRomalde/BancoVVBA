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
import { AccountSearchComponent } from './Components/Cuentas/account-search/account-search.component'

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
