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
    public class ReportController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReportController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Create a report
        [HttpPost]
        public IActionResult CreateReport(Report report)
        {
            report.Timestamp = DateTime.Now;
            _context.Reports.Add(report);
            _context.SaveChanges();
            return Ok("Report submitted");
        }

        // ✅ Get all reports
        [HttpGet]
        public IActionResult GetAllReports()
        {
            var reports = _context.Reports.ToList();
            return Ok(reports);
        }
    }
}
