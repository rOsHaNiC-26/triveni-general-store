using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Triveni.Backend.Models
{
    public class Payment
    {
        public int Id { get; set; }

        public int OrderId { get; set; }
        public Order? Order { get; set; }

        public int UserId { get; set; }

        public string GatewayOrderId { get; set; } = string.Empty;

        public string PaymentMethod { get; set; } = "Razorpay"; // Razorpay, UPI, Cash On Delivery

        public string? TransactionId { get; set; }

        public string Status { get; set; } = "Pending"; // Pending, Success, Failed

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
    }
}
