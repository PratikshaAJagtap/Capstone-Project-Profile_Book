namespace MyApiProject.Models;
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

public class Message
{
    [SwaggerSchema("The ID of the message", ReadOnly = true)]
    public int MessageId { get; set; }

    [SwaggerSchema("ID of the sender")]
    public int SenderId { get; set; }

    [SwaggerSchema("Name of the sender", Example = "admin")]
    public string Sender { get; set; }

    [SwaggerSchema("ID of the receiver")]
    public int ReceiverId { get; set; }

    [SwaggerSchema("Name of the receiver", Example = "john_doe")]
    public string Receiver { get; set; }

    [SwaggerSchema("The message content", Example = "Hello, how are you?")]
    public string MessageContent { get; set; }

    [SwaggerSchema("Message timestamp", Example = "2025-09-09T04:35:46.605Z")]
    public DateTime Timestamp { get; set; }
}