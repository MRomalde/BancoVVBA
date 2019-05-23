﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Banco_VVBA.Repositories;
using Microsoft.AspNetCore.Mvc;
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
        public Task<ActionResult<UsersViewModel>> Register(UsersViewModel userModel)
        {
            return _userRespository.Register(userModel);

        }
        public IEnumerable<UsersViewModel> FindUserByDni(string dni)
        {
            var user = _userRespository.FindUserByDni(dni);
            return user;
        }
        #region server validators
        public bool CheckIfDniExistInDb(string dni)
        {
            //IQueryable te recoge los "datos" pero no los lanza, los tienes que convertir
            //a una lista para poder recuperarlos
            //any() es un metodo que te dice si te hay algo o no en la lista
            var result = _userRespository.CompareDni(dni).ToList().Any();
            return result;
        }

        public bool CheckIfLoginExistInDb(string login)
        {
            var result = _userRespository.compareLogin(login).ToList().Any();
            return result;
        }

        public bool CheckIfEmailExistInDb(string email)
        {
            var result = _userRespository.compareEmail(email).ToList().Any();
            return result;
        }
        public string CheckIfAliasExistInDbAndReturnGoodAlias(string alias)
        {
            string aliasAux =alias;
            int counter=1;
            var result = _userRespository.compareAlias(aliasAux).ToList().Any();
            while(result)
            {
                if (aliasAux.Length != 4)
                    aliasAux=aliasAux.Substring(0,alias.Length);
                aliasAux += counter;
                result = _userRespository.compareAlias(aliasAux).ToList().Any();
                counter++;
            }
            return aliasAux;
        }
        #endregion
    }
}
