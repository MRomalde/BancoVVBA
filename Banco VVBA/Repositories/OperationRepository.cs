using Banco_VVBA.Context;
using Banco_VVBA.Controllers;
using Banco_VVBA.Models;
using Banco_VVBA.Services.AccountService;
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
    public class OperationRepository:Controller
    {
        #region Fields
        readonly BancoVVBAContext _context;
        readonly IConfiguration _configuration;
        public AccountService _accountService;
        #endregion
        #region Constructor
        public OperationRepository(IConfiguration config,BancoVVBAContext bancoVVBAContext)
        {
            _configuration = config;
            _context = bancoVVBAContext;
        }
        #endregion
        internal async Task<ActionResult<IEnumerable<OperationsViewModel>>> GetAllOperations()
        {
            var result = await _context.Operations.Include(Oper => Oper.Account.User).ToListAsync();
            return result;
        }

        internal async Task<ActionResult> CreateOperation(OperationsViewModel model)
        {
            var result = _context.Operations.Add(model);
            await _context.SaveChangesAsync();
            UserAccountsViewModel account = await _accountService.findAccountToUpdateById(model.AccountId);
            if (model.Concept.Equals("Entrada")|| model.Concept.Equals("entrada"))
                account.Balance += model.Amount;
            else
                account.Balance -= model.Amount;
            await _accountService.updateAccount(account);
            return Ok();
        }

        internal async Task<ActionResult<IEnumerable<OperationsViewModel>>> GetOperationById(int id)
        {
            var result = await _context.Operations.Include(Oper => Oper.Account.User).Where(Oper => Oper.OperationId == id).ToListAsync();
            return result;
        }

        internal async Task<ActionResult<IEnumerable<OperationsViewModel>>> GetOperationByAccountId(int accountId)
        {
            var result = await _context.Operations.Include(Oper => Oper.Account.User).Where(Oper => Oper.AccountId == accountId).ToListAsync();
            return result;
        }







    }
}
