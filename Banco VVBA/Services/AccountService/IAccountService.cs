using Banco_VVBA.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Services.AccountService
{
    interface IAccountService
    {
        Task<ActionResult<UserAccountsViewModel>> CreateAccount(UserAccountsViewModel model);
        int FindLastIban();
    }
}
