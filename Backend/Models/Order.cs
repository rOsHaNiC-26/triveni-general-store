using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Triveni.Backend.Models
{
    public class Order
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        public string Status { get; set; } = "Order Received"; // Order Received, Packed, Assigned, Out For Delivery, Delivered, Cancelled

        public int? DeliveryPartnerId { get; set; }
        public DeliveryPartner? DeliveryPartner { get; set; }

        public int AddressId { get; set; }
        public Address? DeliveryAddress { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public Payment? Payment { get; set; }
    }
}
