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
    public class UserRepository: Controller
    {
        #region Fields
        private readonly IConfiguration _configuration;
        private readonly BancoVVBAContext _context;
        #endregion
        #region Constructor
        public UserRepository(BancoVVBAContext context,IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<IEnumerable<UsersViewModel>> FindUserByLogin(LoginModel loginModel)
        {
            var user = await _context.Users.Include(User => User.TypeAccess)
                .Where(User => User.Login == loginModel.Login && User.Password == loginModel.Password).ToListAsync();
            return user;
        }
        #endregion

    }
}
