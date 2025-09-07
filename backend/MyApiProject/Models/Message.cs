namespace MyApiProject.Models;

public class Message
{
    public int MessageId { get; set; }

    // Foreign Key for Sender (User)
    public int SenderId { get; set; }
    public User Sender { get; set; } = null!;

    // Foreign Key for Receiver (User)
    public int ReceiverId { get; set; }
    public User Receiver { get; set; } = null!;

    public string MessageContent { get; set; } = string.Empty;

    // Default to current time when the message is created
    public DateTime Timestamp { get; set; } = DateTime.Now;
}
