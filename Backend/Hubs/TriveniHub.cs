using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Triveni.Backend.Hubs
{
    [Authorize]
    public class TriveniHub : Hub
    {
        public async Task JoinOrderGroup(string orderId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"Order_{orderId}");
            await Clients.Caller.SendAsync("Notification", $"Joined tracking group for Order {orderId}");
        }

        public async Task LeaveOrderGroup(string orderId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"Order_{orderId}");
        }

        [Authorize(Roles = "DeliveryPartner,Admin")]
        public async Task UpdateRiderLocation(string orderId, double latitude, double longitude)
        {
            // Broadcast location to specific order group
            await Clients.Group($"Order_{orderId}").SendAsync("ReceiveLocationUpdate", latitude, longitude);
            
            // Broadcast to all admins
            await Clients.Group("Admins").SendAsync("ReceiveRiderLocation", Context.UserIdentifier, orderId, latitude, longitude);
        }

        [Authorize(Roles = "DeliveryPartner,Admin")]
        public async Task UpdateOrderStatus(string orderId, string status)
        {
            await Clients.Group($"Order_{orderId}").SendAsync("ReceiveStatusUpdate", status);
        }

        public override async Task OnConnectedAsync()
        {
            if (Context.User?.IsInRole("Admin") == true)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, "Admins");
            }
            await base.OnConnectedAsync();
        }
    }
}
