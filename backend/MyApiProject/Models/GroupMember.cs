namespace MyApiProject.Models;

public class GroupMember
{
    public int Id { get; set; }
    public int GroupId { get; set; }
    public int UserId { get; set; }

    public Group? Group { get; set; }
    public User? User { get; set; }
}