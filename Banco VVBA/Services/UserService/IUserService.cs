using Banco_VVBA.Models;
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
    }
}
