using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Triveni.Backend.Hubs
{
    [Authorize]
    public class TrackingHub : Hub
    {
        // Delivery Partner updates their location
        public async Task UpdateLocation(string orderId, double latitude, double longitude)
        {
            // Broadcast location to the specific order group
            await Clients.Group($"Order_{orderId}").SendAsync("LocationUpdated", latitude, longitude);
        }

        // Customer joins a group to track their specific order
        public async Task JoinOrderTracking(string orderId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"Order_{orderId}");
        }

        // Delivery Partner leaves group
        public async Task LeaveOrderTracking(string orderId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"Order_{orderId}");
        }
    }
}
