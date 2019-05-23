using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace Banco_VVBA.Repositories
{
    public class AccountRepository:Controller
    {
        #region Fields
        private readonly IConfiguration _configuration;
        private readonly BancoVVBAContext _context;
        #endregion
        #region Constructor
        public AccountRepository(BancoVVBAContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        internal async Task<ActionResult<UserAccountsViewModel>> CreateAccount(UserAccountsViewModel model)
        {
            _context.Accounts.Add(model);
            await _context.SaveChangesAsync();
            return Ok();
        }

        internal IEnumerable<UserAccountsViewModel> FindLastIban()
        {
            var result =  _context.Accounts.OrderByDescending(Account => Account.AccountId).ToList();
            return result;
        }
        #endregion


    }
}
