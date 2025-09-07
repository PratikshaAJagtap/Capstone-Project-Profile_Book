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
    public class PostController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Create a new post
        [HttpPost]
        public IActionResult CreatePost(Post post)
        {
            _context.Posts.Add(post);
            _context.SaveChanges();
            return Ok(post); // optionally use CreatedAtAction
        }

        // ✅ Get all posts
        [HttpGet]
        public IActionResult GetAllPosts()
        {
            var posts = _context.Posts.ToList();
            return Ok(posts);
        }
    }
}
