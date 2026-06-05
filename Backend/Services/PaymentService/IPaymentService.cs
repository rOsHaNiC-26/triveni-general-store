namespace Triveni.Backend.Services.PaymentService
{
    public interface IPaymentService
    {
        Task<string> CreateRazorpayOrderAsync(string receiptId, decimal amount);
        bool VerifySignature(string razorpayOrderId, string razorpayPaymentId, string signature);
    }
}
