namespace MyApiProject.Models;

public class Group
{
    public int GroupId { get; set; }
    public string GroupName { get; set; } = string.Empty;

    public ICollection<GroupMember>? Members { get; set; }
}