using Microsoft.Extensions.Configuration;
using Razorpay.Api;
using System.Security.Cryptography;
using System.Text;

namespace Triveni.Backend.Services.PaymentService
{
    public class PaymentService : IPaymentService
    {
        private readonly IConfiguration _configuration;
        private readonly RazorpayClient _client;
        private readonly string _keySecret;

        public PaymentService(IConfiguration configuration)
        {
            _configuration = configuration;
            var keyId = _configuration["Razorpay:KeyId"];
            _keySecret = _configuration["Razorpay:KeySecret"]!;
            _client = new RazorpayClient(keyId, _keySecret);
        }

        public async Task<string> CreateRazorpayOrderAsync(string receiptId, decimal amount)
        {
            // Razorpay amount is in paise (multiply by 100)
            decimal amountInPaise = amount * 100;

            var options = new Dictionary<string, object>
            {
                { "amount", amountInPaise },
                { "currency", "INR" },
                { "receipt", receiptId },
                { "payment_capture", 1 } // Auto capture
            };

            // Razorpay API is synchronous in their standard .NET SDK
            Order order = await Task.Run(() => _client.Order.Create(options));
            return order["id"].ToString();
        }

        public bool VerifySignature(string razorpayOrderId, string razorpayPaymentId, string signature)
        {
            string payload = razorpayOrderId + "|" + razorpayPaymentId;
            string generatedSignature = GenerateHMACSHA256(payload, _keySecret);

            return generatedSignature == signature;
        }

        private string GenerateHMACSHA256(string payload, string secret)
        {
            var encoding = new UTF8Encoding();
            byte[] keyByte = encoding.GetBytes(secret);
            byte[] messageBytes = encoding.GetBytes(payload);

            using (var hmacsha256 = new HMACSHA256(keyByte))
            {
                byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
                return BitConverter.ToString(hashmessage).Replace("-", "").ToLower();
            }
        }
    }
}
