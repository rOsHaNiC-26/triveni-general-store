using System.ComponentModel.DataAnnotations;

namespace Triveni.Backend.DTOs.Order
{
    public class PlaceOrderRequestDto
    {
        public int AddressId { get; set; }
        public string PaymentMethod { get; set; } = "Cash On Delivery"; // Razorpay, UPI, Cash On Delivery
        public string? CouponCode { get; set; }
        
        [Required]
        public List<OrderItemDto> Items { get; set; } = new List<OrderItemDto>();
    }

    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
