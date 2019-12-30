using System.ComponentModel.DataAnnotations;

namespace DFar.SincereChiro
{
  public class EmailMessage
  {
    [Required]
    public string Name { get; set; }

    public string Reason { get; set; }

    [Required]
    public string EmailAddress { get; set; }

    public string PhoneNumber { get; set; }

    public string Message { get; set; }
  }
}