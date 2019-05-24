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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
