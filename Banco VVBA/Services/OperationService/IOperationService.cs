using Banco_VVBA.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Services.OperationService
{
    interface IOperationService
    {
        Task<ActionResult<IEnumerable<OperationsViewModel>>> GetAllOperations();
        Task<ActionResult<IEnumerable<OperationsViewModel>>> GetOperationById(int id);
        Task<ActionResult<IEnumerable<OperationsViewModel>>> GetOperationByAccountId(int accountId);
        Task<ActionResult> CreateOperation(OperationsViewModel model);
    }
}
