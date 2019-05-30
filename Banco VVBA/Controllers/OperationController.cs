using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Banco_VVBA.Services.OperationService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Banco_VVBA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationController : ControllerBase
    {
        #region Service declaration
        IOperationService _operService;
        #endregion
        #region Contructor
        public OperationController(IConfiguration configuration, BancoVVBAContext bancoVVBAContext)
        {
            _operService = new OperationService(configuration, bancoVVBAContext);
        }
        #endregion

        //Get:api/[controller]/GetAllOperations
        [HttpGet("getAllOperations")]
        public async Task<ActionResult<IEnumerable<OperationsViewModel>>> GetAllOperations()
        {
            var result = await _operService.GetAllOperations();
            return result;
        }

        //Get:api/[controller]/getOperationByAccountId
        [HttpGet("getOperationByAccountId/{accountId}")]
        public async Task<ActionResult<IEnumerable<OperationsViewModel>>> GetOperationByAccountId(int accountId)
        {
            var result = await _operService.GetOperationByAccountId(accountId);
            return result;
        }


        //Get:api/[controller]/getOperationById/{id}
        [HttpGet("getOperationById/{id}")]
        public async Task<ActionResult<IEnumerable<OperationsViewModel>>> GetOperationById(int id)
        {
            var result = await _operService.GetOperationById(id);
            return Ok(result);
        }

        //Post:api/[controller]/createOperation
        [HttpPost("createOperation")]
        public async Task<ActionResult> CreateOperation(OperationsViewModel model)
        {
            var result = await _operService.CreateOperation(model);
            return result;
        }

    }
}
