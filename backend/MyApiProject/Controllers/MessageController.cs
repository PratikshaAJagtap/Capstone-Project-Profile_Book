using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MyApiProject.Data;
using MyApiProject.Models;
using System;
using System.Linq;

namespace MyApiProject.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MessageController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Send a message
        [HttpPost]
        public IActionResult SendMessage(Message message)
        {
            message.Timestamp = DateTime.UtcNow; // use UTC for consistency
            _context.Messages.Add(message);
            _context.SaveChanges();
            return Ok("Message sent successfully.");
        }

        // ✅ Get received messages for a user
        [HttpGet("inbox/{userId}")]
        public IActionResult GetInbox(int userId)
        {
            var messages = _context.Messages
                .Where(m => m.ReceiverId == userId)
                .ToList();

            return Ok(messages);
        }
    }
}
