using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Triveni.Backend.Data;
using Triveni.Backend.DTOs.Order;
using Triveni.Backend.Models;

namespace Triveni.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetMyOrders()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            return Ok(orders);
        }

        [HttpPost]
        public async Task<IActionResult> PlaceOrder([FromBody] PlaceOrderRequestDto request)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

            decimal totalAmount = 0;
            var orderItems = new List<OrderItem>();

            foreach (var item in request.Items)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product == null || product.Stock < item.Quantity)
                {
                    return BadRequest($"Product {item.ProductId} is out of stock or does not exist.");
                }

                var price = product.DiscountPrice > 0 ? product.DiscountPrice : product.Price;
                totalAmount += price * item.Quantity;
                
                // Deduct stock
                product.Stock -= item.Quantity;

                orderItems.Add(new OrderItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = price
                });
            }

            var order = new Order
            {
                UserId = userId,
                TotalAmount = totalAmount,
                Status = "Order Received",
                AddressId = request.AddressId,
                OrderItems = orderItems
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync(); // Save to generate OrderId

            // Create Payment Record
            var payment = new Payment
            {
                OrderId = order.Id,
                PaymentMethod = request.PaymentMethod,
                Amount = totalAmount,
                Status = request.PaymentMethod == "Cash On Delivery" ? "Pending" : "Success" // Assuming Razorpay success handled separately
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Order placed successfully", OrderId = order.Id });
        }

        [Authorize(Roles = "Admin,DeliveryPartner")]
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string status)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            order.Status = status;
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Order status updated", Status = order.Status });
        }
    }
}
