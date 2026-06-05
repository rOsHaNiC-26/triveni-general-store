namespace Triveni.Backend.Models
{
    public class DeliveryPartner
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public string VehicleNumber { get; set; } = string.Empty;
        public string DrivingLicense { get; set; } = string.Empty;

        public bool IsAvailable { get; set; } = true;

        public string? CurrentLatitude { get; set; }
        public string? CurrentLongitude { get; set; }
    }
}
