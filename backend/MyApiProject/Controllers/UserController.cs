using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using MyApiProject.Data;
using MyApiProject.Models;

namespace MyApiProject.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _context.Users.ToList();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, User updatedUser)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();

            user.Username = updatedUser.Username;
            user.Role = updatedUser.Role;
            user.ProfileImage = updatedUser.ProfileImage;

            _context.SaveChanges();
            return Ok("User updated");
        }

        [AllowAnonymous]  // Usually registration is open
        [HttpPost]
        public IActionResult CreateUser(User newUser)
        {
            _context.Users.Add(newUser);
            _context.SaveChanges();
            return Ok("User created successfully");
        }

        [HttpDelete("{id}")]
public IActionResult DeleteUser(int id)
{
    var user = _context.Users.Find(id);
    if (user == null) return NotFound();

    _context.Users.Remove(user);
    _context.SaveChanges();
    return Ok("User deleted");
}
    }

    
}
