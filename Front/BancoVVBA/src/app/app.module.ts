import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/User/login/login.component';
import { NavBarComponent } from './Components/NavBar/nav-bar/nav-bar.component';
import { UsersComponent } from './Components/User/users/users.component';
import { OperationsComponent } from './Components/Operaciones/operations/operations.component';
import { AccountsComponent } from './Components/Cuentas/accounts/accounts.component';
import { CommissionsComponent } from './Components/Comisiones/commissions/commissions.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { RegisterComponent } from './Components/User/register/register.component';

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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
