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
import { AuthGuard} from './Guard/auth.guard'

const routes: Routes = [
  {path:"user/login", component: LoginComponent},
  {path:"user/register", component:RegisterComponent},
  {path:"user/passwordRecovery", component:PasswordRecoveryComponent},
  {path:"user/users" , component: UsersComponent, canActivate: [AuthGuard]},
  {path:"user/details/:id" , component: UserDetailsComponent, canActivate: [AuthGuard]},
  {path:"user/create", component:UserCreateComponent, canActivate: [AuthGuard]},
  {path:"user/myAccount", component:MyAccountComponent, canActivate: [AuthGuard]},
  {path:"user/myAccount/details/:id", component:MyAccountDetailsComponent, canActivate: [AuthGuard]},
  {path:"user/myAccount/createOper", component:MyAccountCreateOperComponent, canActivate: [AuthGuard]},
  {path:"user/myAccount/createTransfer", component:MyAccountCreateTransferComponent, canActivate: [AuthGuard]},
  {path:"account/accounts", component:AccountsComponent, canActivate: [AuthGuard]},
  {path:"account/details/:id", component:AccountDetailsComponent, canActivate: [AuthGuard]},
  {path:"operation/operations", component:OperationsComponent, canActivate: [AuthGuard]},
  {path:"operation/details/:id", component:OperationDetailsComponent, canActivate: [AuthGuard]},
  {path:"operation/create", component:OperationCreateComponent, canActivate: [AuthGuard]},
  {path:"commission/commissions", component:CommissionsComponent, canActivate: [AuthGuard]},
  {path:"commission/details/:id", component:CommissionDetailsComponent, canActivate: [AuthGuard]},
  {path:"commission/create", component:CommissionCreateComponent, canActivate: [AuthGuard]},
  {path:"accountCommission/accountCommissions", component:AccountCommissionsComponent, canActivate: [AuthGuard]},
  {path:"accountCommission/create", component:AccountCommissionsCreateComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: "/user/login", pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
