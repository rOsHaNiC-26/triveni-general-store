using System.ComponentModel.DataAnnotations.Schema;

namespace Triveni.Backend.Models
{
    public class Wallet
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Balance { get; set; } = 0;

        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}
