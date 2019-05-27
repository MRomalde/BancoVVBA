import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/Components/User/login/login.component';
import { UsersComponent } from '../app/Components/User/users/users.component';
import { AccountsComponent } from '../app/Components/Cuentas/accounts/accounts.component';
import { OperationsComponent } from '../app/Components/Operaciones/operations/operations.component';
import { CommissionsComponent } from '../app/Components/Comisiones/commissions/commissions.component';
import { RegisterComponent } from '../app/Components/User/register/register.component';
import { MyAccountComponent } from './Components/User/my-account/my-account.component';

const routes: Routes = [
  {path:"user/login", component: LoginComponent},
  {path:"user/register", component:RegisterComponent},
  {path:"user/users" , component: UsersComponent},
  {path:"user/details/:id" , component: UsersComponent},
  {path:"user/myAccount", component:MyAccountComponent},
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
