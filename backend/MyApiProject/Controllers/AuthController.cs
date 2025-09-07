using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MyApiProject.Models;
using MyApiProject.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace MyApiProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // ✅ REGISTER
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            if (_context.Users.Any(u => u.Username == user.Username))
                return BadRequest("User already exists.");

            // Password hash
             var passwordHasher = new PasswordHasher<User>();
             user.Password = passwordHasher.HashPassword(user, user.Password);

            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok("Registration successful.");
        }

        // ✅ LOGIN
       [AllowAnonymous]
[HttpPost("login")]
public IActionResult Login(User login)
{
    // Step 1: Username ne user find kara
    var user = _context.Users.FirstOrDefault(u => u.Username == login.Username);

    if (user == null)
        return Unauthorized("Invalid credentials.");

    // Step 2: Password verify kara using PasswordHasher
    var passwordHasher = new PasswordHasher<User>();
    var result = passwordHasher.VerifyHashedPassword(user, user.Password, login.Password);

    // For testing purposes, also check plain text password if hashed verification fails
    if (result == PasswordVerificationResult.Failed)
    {
        if (user.Password != login.Password)
            return Unauthorized("Invalid credentials.");
    }

    // Step 3: Token generate kara ani return kara
    var token = GenerateJwtToken(user);
    return Ok(new
    {
        token,
        user = new
        {
            userId = user.UserId,
            username = user.Username,
            role = user.Role,
            profileImage = user.ProfileImage
        }
    });
}

        // ✅ GENERATE JWT TOKEN
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:DurationInMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
