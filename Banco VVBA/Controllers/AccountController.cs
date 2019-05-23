using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Banco_VVBA.Services.AccountService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Banco_VVBA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        #region Service declaration
        private IAccountService _accountService;
        #endregion
        #region Constructor
        public AccountController(IConfiguration configuration, BancoVVBAContext bancoVVBAContext)
        {
            _accountService = new AccountService(bancoVVBAContext, configuration);
        }
        #endregion
        //POST:api/[controller]/createAccount
        [HttpPost("CreateAccount")]
        public async Task<ActionResult<UserAccountsViewModel>> CreateAccount(UserAccountsViewModel model)
        {
            var result =await _accountService.CreateAccount(model);
            return result;
        }
        //Get the last IBAN
        [HttpGet("FindLastIban")]
        public int FindLastIban()
        {
            var result = _accountService.FindLastIban();
            return Convert.ToInt32(result);
        }













        // GET: api/Account/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Account
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Account/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
