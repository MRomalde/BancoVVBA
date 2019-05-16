using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Banco_VVBA.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Banco_VVBA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        #region Service declaration
        private IUserService _userService;
        #endregion
        #region Constructor
        public UserController(IConfiguration configuration, BancoVVBAContext bancoVVBAContext)
        {
            _userService = new UserService(bancoVVBAContext, configuration);
        }
        #endregion


        //Post:pi/[controller]/login
        [HttpPost]
        public async Task<ActionResult<IEnumerable<UsersViewModel>>> Login(LoginModel loginModel)
        {
            var user = _userService.Login(loginModel);
            return Ok(user);

        }

        // GET: api/User
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/User
        [HttpPost]
        public void Post(string value)
        {
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public void Put(int id, string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
