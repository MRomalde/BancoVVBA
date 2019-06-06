import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/Components/User/login/login.component';
import { UsersComponent } from '../app/Components/User/users/users.component';
import { AccountsComponent } from '../app/Components/Cuentas/accounts/accounts.component';
import { OperationsComponent } from '../app/Components/Operaciones/operations/operations.component';
import { CommissionsComponent } from '../app/Components/Comisiones/commissions/commissions.component';
import { RegisterComponent } from '../app/Components/User/register/register.component';
import { MyAccountComponent } from './Components/User/my-account/my-account.component';
import { UserDetailsComponent } from './Components/User/user-details/user-details.component';
import { UserCreateComponent } from './Components/User/user-create/user-create.component';
import { AccountDetailsComponent } from './Components/Cuentas/account-details/account-details.component';
import { OperationDetailsComponent } from './Components/Operaciones/operation-details/operation-details.component';
import { OperationCreateComponent } from './Components/Operaciones/operation-create/operation-create.component';
import { CommissionDetailsComponent } from './Components/Comisiones/commission-details/commission-details.component';
import { CommissionCreateComponent } from './Components/Comisiones/commission-create/commission-create.component';
import { AccountCommissionsComponent } from './Components/CuentasComisiones/account-commissions/account-commissions.component';
import { AccountCommissionsCreateComponent } from './Components/CuentasComisiones/account-commissions-create/account-commissions-create.component';
import { MyAccountDetailsComponent } from './Components/User/my-account-details/my-account-details.component';
import { MyAccountCreateOperComponent } from './Components/User/my-account-create-oper/my-account-create-oper.component';
import { MyAccountCreateTransferComponent } from './Components/User/my-account-create-transfer/my-account-create-transfer.component';
import { PasswordRecoveryComponent } from './Components/User/password-recovery/password-recovery.component';

const routes: Routes = [
  {path:"user/login", component: LoginComponent},
  {path:"user/register", component:RegisterComponent},
  {path:"user/passwordRecovery", component:PasswordRecoveryComponent},
  {path:"user/users" , component: UsersComponent},
  {path:"user/details/:id" , component: UserDetailsComponent},
  {path:"user/create", component:UserCreateComponent},
  {path:"user/myAccount", component:MyAccountComponent},
  {path:"user/myAccount/details/:id", component:MyAccountDetailsComponent},
  {path:"user/myAccount/createOper", component:MyAccountCreateOperComponent},
  {path:"user/myAccount/createTransfer", component:MyAccountCreateTransferComponent},
  {path:"account/accounts", component:AccountsComponent},
  {path:"account/details/:id", component:AccountDetailsComponent},
  {path:"operation/operations", component:OperationsComponent},
  {path:"operation/details/:id", component:OperationDetailsComponent},
  {path:"operation/create", component:OperationCreateComponent},
  {path:"commission/commissions", component:CommissionsComponent},
  {path:"commission/details/:id", component:CommissionDetailsComponent},
  {path:"commission/create", component:CommissionCreateComponent},
  {path:"accountCommission/accountCommissions", component:AccountCommissionsComponent},
  {path:"accountCommission/create", component:AccountCommissionsCreateComponent},
  {path: '', redirectTo: "/user/login", pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
