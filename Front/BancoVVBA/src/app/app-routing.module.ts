import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/User/login/login.component';
import { UsersComponent } from './Components/User/users/users.component';
import { AccountsComponent } from './Components/Cuentas/accounts/accounts.component';
import { OperationsComponent } from './Components/Operaciones/operations/operations.component';
import { CommissionsComponent } from './Components/Comisiones/commissions/commissions.component';
import { RegisterComponent } from './Components/User/register/register.component';

const routes: Routes = [
  {path:"user/login", component: LoginComponent},
  {path:"user/register", component:RegisterComponent},
  {path:"user/users" , component: UsersComponent},
  {path:"account/accounts", component:AccountsComponent},
  {path:"operation/operations", component:OperationsComponent},
  {path:"commission/commissions", component:CommissionsComponent},
  {path: '', redirectTo: "/user/login", pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
