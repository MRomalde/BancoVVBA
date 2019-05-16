using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Banco_VVBA.Repositories;
using Microsoft.Extensions.Configuration;

namespace Banco_VVBA.Services.UserService
{
    public class UserService : IUserService
    {
        #region declaration of repository
        private UserRepository _userRespository;
        #endregion
        #region Constructor
        public UserService(BancoVVBAContext context,IConfiguration configuration)
        {
            _userRespository = new UserRepository(context, configuration);
        }
        #endregion
        public Task<IEnumerable<UsersViewModel>> Login(LoginModel loginModel)
        {
            var user = _userRespository.FindUserByLogin(loginModel);
            return user;
        }
        public Task<IEnumerable<UsersViewModel>> GetUsers()
        {
            throw new NotImplementedException();
        }
    }
}
