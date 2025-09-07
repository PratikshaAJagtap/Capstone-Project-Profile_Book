namespace MyApiProject.Models;

public class User
{
    public int UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;// "Admin" / "User"
    public string? ProfileImage { get; set; }

    

    // Relationships
    public ICollection<Post>? Posts { get; set; }

    // Messages: One user can send and receive many messages
    public ICollection<Message>? SentMessages { get; set; }
    public ICollection<Message>? ReceivedMessages { get; set; }

    public User()
    {
        Username = "";
        Password = "";
        Role = "";
    }
}