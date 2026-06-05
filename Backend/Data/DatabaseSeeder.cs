using Triveni.Backend.Models;

namespace Triveni.Backend.Data
{
    public static class DatabaseSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            if (context.Categories.Any() || context.Products.Any())
            {
                return; // DB has been seeded
            }

            var categories = new List<Category>
            {
                new Category { Name = "Grocery", Description = "Daily essentials like rice, dal, spices", ImageUrl = "https://placeholder.com/grocery.jpg" },
                new Category { Name = "Fruits", Description = "Fresh seasonal fruits", ImageUrl = "https://placeholder.com/fruits.jpg" },
                new Category { Name = "Vegetables", Description = "Fresh daily vegetables", ImageUrl = "https://placeholder.com/veg.jpg" },
                new Category { Name = "Dairy", Description = "Milk, curd, paneer, and more", ImageUrl = "https://placeholder.com/dairy.jpg" },
                new Category { Name = "Snacks", Description = "Chips, namkeen, biscuits", ImageUrl = "https://placeholder.com/snacks.jpg" },
                new Category { Name = "Cold Drinks", Description = "Soft drinks, juices, energy drinks", ImageUrl = "https://placeholder.com/drinks.jpg" },
                new Category { Name = "Puja Samagri", Description = "Items for daily puja", ImageUrl = "https://placeholder.com/puja.jpg" },
                new Category { Name = "Home Care", Description = "Cleaning and household items", ImageUrl = "https://placeholder.com/home.jpg" },
                new Category { Name = "Personal Care", Description = "Soaps, shampoos, grooming", ImageUrl = "https://placeholder.com/personal.jpg" },
                new Category { Name = "Baby Care", Description = "Diapers, baby food", ImageUrl = "https://placeholder.com/baby.jpg" }
            };

            context.Categories.AddRange(categories);
            await context.SaveChangesAsync(); // Save categories first so they get IDs

            var products = new List<Product>();
            var random = new Random();

            foreach (var category in categories)
            {
                for (int i = 1; i <= 10; i++)
                {
                    var price = random.Next(20, 500);
                    products.Add(new Product
                    {
                        Name = $"{category.Name} Product {i}",
                        Description = $"Premium quality {category.Name} product for your daily needs.",
                        ImageUrl = $"https://placeholder.com/{category.Name.ToLower()}{i}.jpg",
                        Price = price,
                        DiscountPrice = price - (price * (decimal)0.1), // 10% discount
                        Stock = random.Next(10, 100),
                        Rating = (decimal)(random.NextDouble() * 2 + 3), // Rating between 3.0 and 5.0
                        CategoryId = category.Id
                    });
                }
            }

            context.Products.AddRange(products);

            // Add an Admin user
            var admin = new User
            {
                FullName = "Ramniwas Beni Chaurasiya",
                Email = "admin@trivenistore.com",
                PhoneNumber = "9876543210",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                Role = "Admin"
            };
            context.Users.Add(admin);

            await context.SaveChangesAsync();
        }
    }
}
