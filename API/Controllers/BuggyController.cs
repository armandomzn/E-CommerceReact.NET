using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails { Title = "This is a bad request" });
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            //* Retornamos un error de tipo Bad Request(400) junto con un arreglo de errores que definimos con el ModelState
            ModelState.AddModelError("Problem 1", "This is the first error");
            ModelState.AddModelError("Problem 2", "This is the second error");
            return ValidationProblem();
        }

        [HttpGet("sever-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a server Error");
        }

        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        }
    }
}