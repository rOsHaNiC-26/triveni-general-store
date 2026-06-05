using System.ComponentModel.DataAnnotations;

namespace Triveni.Backend.Models
{
    public class Address
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        [Required]
        public string Street { get; set; } = string.Empty;

        [Required]
        public string City { get; set; } = string.Empty;

        [Required]
        public string State { get; set; } = string.Empty;

        [Required]
        public string ZipCode { get; set; } = string.Empty;

        [Required]
        public string Country { get; set; } = "India";

        public bool IsDefault { get; set; } = false;
        
        public string? Latitude { get; set; }
        public string? Longitude { get; set; }
    }
}
