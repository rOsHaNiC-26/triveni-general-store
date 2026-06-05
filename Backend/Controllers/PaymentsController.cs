using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Triveni.Backend.Services.PaymentService;
using Triveni.Backend.Data;
using Triveni.Backend.Models;
using System.Security.Claims;
using Razorpay.Api;

namespace Triveni.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly AppDbContext _context;

        public PaymentsController(IPaymentService paymentService, AppDbContext context)
        {
            _paymentService = paymentService;
            _context = context;
        }

        [HttpPost("create-order")]
        [Authorize]
        public async Task<IActionResult> CreateOrder([FromBody] CreatePaymentRequest request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            
            var order = await _context.Orders.FindAsync(request.OrderId);
            if (order == null || order.UserId != userId)
                return NotFound("Order not found or unauthorized.");

            try
            {
                var razorpayOrderId = await _paymentService.CreateRazorpayOrderAsync(order.Id.ToString(), order.TotalAmount);
                
                var payment = new Triveni.Backend.Models.Payment
                {
                    OrderId = order.Id,
                    UserId = userId,
                    GatewayOrderId = razorpayOrderId,
                    Amount = order.TotalAmount,
                    Status = "PENDING"
                };
                _context.Payments.Add(payment);
                await _context.SaveChangesAsync();

                return Ok(new { RazorpayOrderId = razorpayOrderId, Amount = order.TotalAmount });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Payment creation failed: {ex.Message}");
            }
        }

        [HttpPost("verify")]
        [Authorize]
        public async Task<IActionResult> VerifyPayment([FromBody] VerifyPaymentRequest request)
        {
            bool isValid = _paymentService.VerifySignature(request.RazorpayOrderId, request.RazorpayPaymentId, request.Signature);

            if (!isValid)
                return BadRequest("Invalid payment signature.");

            var payment = await _context.Payments.FirstOrDefaultAsync(p => p.GatewayOrderId == request.RazorpayOrderId);

            if (payment == null)
                return NotFound("Payment record not found.");

            payment.TransactionId = request.RazorpayPaymentId;
            payment.Status = "SUCCESS";
            payment.PaymentMethod = "ONLINE";

            var order = await _context.Orders.FindAsync(payment.OrderId);
            if (order != null)
            {
                order.Status = "CONFIRMED";
            }

            await _context.SaveChangesAsync();

            return Ok(new { Message = "Payment verified successfully." });
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> RazorpayWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var signature = HttpContext.Request.Headers["X-Razorpay-Signature"].ToString();
            var webhookSecret = "YourWebhookSecret"; // From Config

            try
            {
                // Verify webhook signature (using Razorpay utility)
                Utils.verifyWebhookSignature(json, signature, webhookSecret);
            }
            catch (Exception)
            {
                return BadRequest("Invalid webhook signature.");
            }

            // Parse json to get event details and update DB
            // dynamic data = JsonConvert.DeserializeObject(json);
            // if (data.event == "payment.captured") { ... }

            return Ok();
        }
    }

    public class CreatePaymentRequest
    {
        public int OrderId { get; set; }
    }

    public class VerifyPaymentRequest
    {
        public string RazorpayOrderId { get; set; } = string.Empty;
        public string RazorpayPaymentId { get; set; } = string.Empty;
        public string Signature { get; set; } = string.Empty;
    }
}
