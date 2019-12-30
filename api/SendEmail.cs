using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Mail;
using System.Net;

namespace DFar.SincereChiro
{
  public class SendEmail
  {
    private readonly SmtpClient _smtpClient;

    public SendEmail()
    {
      var smtpServer = SetEnvironmentVariable("SincereChiroSmtpServer");
      var smtpUsername = SetEnvironmentVariable("SincereChiroSmtpUsername");
      var smtpPassword = SetEnvironmentVariable("SincereChiroSmtpPassword");

      _smtpClient = new SmtpClient(smtpServer)
      {
        Port = 587,
        UseDefaultCredentials = false,
        Credentials = new NetworkCredential(smtpUsername, smtpPassword),
        EnableSsl = true
      };
    }

    [FunctionName("SendEmail")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "email")]
        HttpRequest req,
        ILogger log)
    {
      if (req.ContentLength <= 0)
      {
        return new BadRequestObjectResult("Payload required.");
      }

      string requestBody;
      using (StreamReader readStream = new StreamReader(req.Body))
      {
        requestBody = await readStream.ReadToEndAsync();
      }

      EmailMessage data;
      try
      {
        data = JsonConvert.DeserializeObject<EmailMessage>(requestBody);
      }
      catch (Exception e)
      {
        return new BadRequestObjectResult($"Invalid payload: {e.Message}");
      }

      if (data.EmailAddress == null || data.Name == null)
      {
        return new BadRequestObjectResult("Invalid payload, missing name " +
        "and/or email address.");
      }

      var mailMessage = CreateMailMessage(data);
      _smtpClient.Send(mailMessage);

      return new OkResult();
    }

    private string SetEnvironmentVariable(string key)
    {
      string value = Environment.GetEnvironmentVariable(key);

      if (value == null)
      {
        throw new ArgumentNullException(
          $"Environment variable {key} not set.");
      }

      return value;
    }

    private MailMessage CreateMailMessage(EmailMessage model)
    {
      var fromAddress = SetEnvironmentVariable("SincereChiroFromEmailAddress");
      var toAddress = SetEnvironmentVariable("SincereChiroToEmailAddress");
      var subject = SetEnvironmentVariable("SincereChiroSubject");

      var mailMessage = new MailMessage
      {
        From = new MailAddress(fromAddress)
      };
      mailMessage.To.Add(toAddress);
      mailMessage.ReplyToList.Add(model.EmailAddress);
      mailMessage.Body = GenerateBody(model);
      mailMessage.Subject = subject;
      return mailMessage;
    }

    private static string GenerateBody(EmailMessage model)
    {
      return "Name: " + model.Name + "\n" +
             "Email: " + model.EmailAddress + "\n" +
             "Phone: " + model.PhoneNumber + "\n" +
             "Reason: " + model.Reason + "\n\n" +
             "Message: " + model.Message;
    }
  }
}
