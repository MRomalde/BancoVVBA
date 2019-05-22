﻿using Banco_VVBA.Context;
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
        #endregion
        public async Task<IEnumerable<UsersViewModel>> FindUserByLogin(LoginModel loginModel)
        {
            var user = await _context.Users.Include(User => User.TypeAccess)
                .Where(User => User.Login == loginModel.Login && User.Password == loginModel.Password).ToListAsync();
            return user;
        }
        internal async Task<ActionResult<UsersViewModel>> Register(UsersViewModel userModel)
        {
            _context.Users.Add(userModel);
            await _context.SaveChangesAsync();
            return Ok();
        }
        #region Server validators
        public IQueryable<UsersViewModel> CompareDni(string dni)
        {
            var existDni = _context.Users.Where(User => User.Dni == dni);
            return existDni;
        }

        internal IQueryable<UsersViewModel> compareEmail(string email)
        {
            var existEmail = _context.Users.Where(User => User.Mail == email);
            return existEmail;
        }

        internal IQueryable<UsersViewModel> compareLogin(string login)
        {
            var existLogin = _context.Users.Where(User => User.Login == login);
            return existLogin;
        }
        internal IQueryable<UsersViewModel> compareAlias(string alias)
        {
            var existAlias = _context.Users.Where(User => User.Alias == alias);
            return existAlias;
        }
        #endregion
    }
}
