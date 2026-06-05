using System.ComponentModel.DataAnnotations.Schema;

namespace Triveni.Backend.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        public int WalletId { get; set; }
        public Wallet? Wallet { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        public string Type { get; set; } = "Credit"; // Credit, Debit

        public string? Description { get; set; }

        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
    }
}
