namespace MyApiProject.Models;

public class Report
{
    public int ReportId { get; set; }
    public int ReportedUserId { get; set; }
    public int ReportingUserId { get; set; }
    public string Reason { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }

    public User? ReportedUser { get; set; }
    public User? ReportingUser { get; set; }
}
