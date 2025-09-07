namespace MyApiProject.Models;

public class Post
{
    public int PostId { get; set; }
    public int UserId { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? PostImage { get; set; }
    public string Status { get; set; } = string.Empty; // Pending, Approved, Rejected

    public User? User { get; set; }
}
