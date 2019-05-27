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

        //Get:api/[controller]/getAllUsers
        [HttpGet("getAllUsers")]
        public async Task<ActionResult<IEnumerable<UsersViewModel>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);

        }
        //Get:api/[controller]/name/{name}
        [HttpGet("name/{name}")]
        public async Task<IEnumerable<UsersViewModel>> SearchByName(string name)
        {
            var usersByName = await _userService.SearchByName(name);
            return usersByName;
        }

        //Post:api/[controller]/login
        [HttpPost("login")]
        public async Task<ActionResult<IEnumerable<UsersViewModel>>> Login(LoginModel loginModel)
        {
            var user = await _userService.Login(loginModel);
            if(user.Count()!=0)
                return Ok(user);
            else
                return NoContent();            
        }
        //Post:api/[controller]/register
        [HttpPost("register")]
        public async Task<ActionResult<UsersViewModel>> Register(UsersViewModel userModel)
        {
            var result= await _userService.Register(userModel);
            return result;
        }

        //Get:api/[controller]/findByDni
        [HttpGet("FindUserByDni/{dni}")]
        public  IEnumerable<UsersViewModel> FindUserByDni(string dni)
        {
            var user =  _userService.FindUserByDni(dni);
            return user;
        }
        
        #region Server Validators
        // GET: api/[controller]/checkdni/dni
        [HttpGet("CheckIfDniExistInDb/{dni}")]
        public bool CheckIfDniExistInDb(string dni)
        {
            return _userService.CheckIfDniExistInDb(dni);
        }

        [HttpGet("CheckIfLoginExistInDb/{login}")]
        public bool CheckIfLoginExistInDb(string login)
        {
            return _userService.CheckIfLoginExistInDb(login);
        }
        [HttpGet("CheckIfEmailExistInDb/{email}")]
        public bool CheckIfEmailExistInDb(string email)
        {
            return _userService.CheckIfEmailExistInDb(email);
        }
        [HttpGet("CheckIfAliasExistInDb/{alias}")]
        public string CheckIfAliasExistInDb(string alias)
        {
            var result=  _userService.CheckIfAliasExistInDbAndReturnGoodAlias(alias);
            return result;
        }
        #endregion

    }
}
