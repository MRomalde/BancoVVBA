using Banco_VVBA.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Services.UserService
{
    interface IUserService
    {
        Task<IEnumerable<UsersViewModel>> GetUsers();
        Task<IEnumerable<UsersViewModel>> Login(LoginModel loginModel);
        bool CheckIfDniExistInDb(string dni);
        bool CheckIfLoginExistInDb(string login);
        bool CheckIfEmailExistInDb(string email);
        Task<ActionResult<UsersViewModel>> Register(UsersViewModel userModel);
        bool CheckIfAliasExistInDb(string alias);
    }
}
