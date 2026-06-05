-- ==============================================================
-- TRIVENI GENERAL STORE - COMPLETE MYSQL DATABASE SCHEMA
-- ==============================================================
-- Optimized for High Traffic, Fast Search, and Scalability
-- Features: Primary Keys, Foreign Keys, Indexes, Audit Columns, Soft Delete

CREATE DATABASE IF NOT EXISTS triveni_general_store
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE triveni_general_store;

-- ==================== 1. ROLES & USERS ====================

CREATE TABLE Roles (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL UNIQUE,
    Description VARCHAR(255),
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Phone VARCHAR(20) UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    ProfileImage VARCHAR(500),
    IsVerified BOOLEAN DEFAULT FALSE,
    IsActive BOOLEAN DEFAULT TRUE,
    LastLoginAt DATETIME NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN DEFAULT FALSE,
    DeletedAt DATETIME NULL,
    INDEX idx_user_email (Email),
    INDEX idx_user_phone (Phone)
);

CREATE TABLE UserRoles (
    UserId INT NOT NULL,
    RoleId INT NOT NULL,
    AssignedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UserId, RoleId),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (RoleId) REFERENCES Roles(Id) ON DELETE CASCADE
);

-- ==================== 2. ADDRESSES & LOCATIONS ====================

CREATE TABLE Addresses (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    Label VARCHAR(50) NOT NULL, -- e.g., 'Home', 'Work'
    StreetAddress VARCHAR(255) NOT NULL,
    City VARCHAR(100) NOT NULL,
    State VARCHAR(100) NOT NULL,
    PostalCode VARCHAR(20) NOT NULL,
    Latitude DECIMAL(10, 8),
    Longitude DECIMAL(11, 8),
    IsDefault BOOLEAN DEFAULT FALSE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    INDEX idx_address_userid (UserId)
);

-- ==================== 3. CATEGORIES & PRODUCTS ====================

CREATE TABLE Categories (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ParentId INT NULL,
    Name VARCHAR(100) NOT NULL UNIQUE,
    Slug VARCHAR(150) NOT NULL UNIQUE,
    Description TEXT,
    ImageUrl VARCHAR(500),
    IsActive BOOLEAN DEFAULT TRUE,
    SortOrder INT DEFAULT 0,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (ParentId) REFERENCES Categories(Id) ON DELETE SET NULL,
    INDEX idx_category_slug (Slug)
);

CREATE TABLE Products (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    CategoryId INT NOT NULL,
    Name VARCHAR(200) NOT NULL,
    Slug VARCHAR(250) NOT NULL UNIQUE,
    Description TEXT,
    OriginalPrice DECIMAL(10, 2) NOT NULL,
    SellingPrice DECIMAL(10, 2) NOT NULL,
    SKU VARCHAR(50) UNIQUE,
    Weight VARCHAR(50),
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN DEFAULT FALSE,
    DeletedAt DATETIME NULL,
    FOREIGN KEY (CategoryId) REFERENCES Categories(Id) ON DELETE RESTRICT,
    INDEX idx_product_category (CategoryId),
    INDEX idx_product_slug (Slug),
    FULLTEXT INDEX ft_product_name_desc (Name, Description) -- Fast Search Optimization
);

CREATE TABLE ProductImages (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ProductId INT NOT NULL,
    ImageUrl VARCHAR(500) NOT NULL,
    IsPrimary BOOLEAN DEFAULT FALSE,
    SortOrder INT DEFAULT 0,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ProductId) REFERENCES Products(Id) ON DELETE CASCADE
);

CREATE TABLE Inventory (
    ProductId INT PRIMARY KEY,
    Quantity INT NOT NULL DEFAULT 0,
    LowStockThreshold INT DEFAULT 10,
    LastRestockedAt DATETIME,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ProductId) REFERENCES Products(Id) ON DELETE CASCADE
);

-- ==================== 4. SHOPPING BAG & WISHLIST ====================

CREATE TABLE Cart (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    TotalAmount DECIMAL(10, 2) DEFAULT 0,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE TABLE CartItems (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    CartId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL DEFAULT 1,
    PriceAtAddition DECIMAL(10, 2) NOT NULL,
    AddedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CartId) REFERENCES Cart(Id) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(Id) ON DELETE CASCADE,
    UNIQUE KEY (CartId, ProductId)
);

CREATE TABLE Wishlist (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    ProductId INT NOT NULL,
    AddedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(Id) ON DELETE CASCADE,
    UNIQUE KEY (UserId, ProductId)
);

-- ==================== 5. OFFERS & COUPONS ====================

CREATE TABLE Offers (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Description TEXT,
    DiscountPercentage DECIMAL(5, 2),
    ValidFrom DATETIME,
    ValidUntil DATETIME,
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Coupons (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Code VARCHAR(20) NOT NULL UNIQUE,
    DiscountType ENUM('PERCENTAGE', 'FIXED_AMOUNT') NOT NULL,
    DiscountValue DECIMAL(10, 2) NOT NULL,
    MinOrderValue DECIMAL(10, 2) DEFAULT 0,
    MaxDiscountAmount DECIMAL(10, 2) NULL,
    ValidFrom DATETIME NOT NULL,
    ValidUntil DATETIME NOT NULL,
    UsageLimit INT NULL, -- Total times coupon can be used overall
    UsagePerUser INT DEFAULT 1, -- Max times a single user can use it
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_coupon_code (Code)
);

CREATE TABLE CouponUsage (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    CouponId INT NOT NULL,
    UserId INT NOT NULL,
    OrderId INT NOT NULL,
    DiscountApplied DECIMAL(10, 2) NOT NULL,
    UsedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CouponId) REFERENCES Coupons(Id) ON DELETE RESTRICT,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE RESTRICT
);

-- ==================== 6. ORDERS & PAYMENTS ====================

CREATE TABLE Orders (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    AddressId INT NOT NULL,
    CouponId INT NULL,
    OrderNumber VARCHAR(50) NOT NULL UNIQUE,
    SubTotal DECIMAL(10, 2) NOT NULL,
    DeliveryFee DECIMAL(10, 2) DEFAULT 0,
    DiscountAmount DECIMAL(10, 2) DEFAULT 0,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    OrderStatus ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'REFUNDED') DEFAULT 'PENDING',
    PaymentMethod ENUM('COD', 'ONLINE') NOT NULL,
    PaymentStatus ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
    DeliveryPartnerId INT NULL,
    ExpectedDeliveryTime DATETIME,
    DeliveredAt DATETIME NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE RESTRICT,
    FOREIGN KEY (AddressId) REFERENCES Addresses(Id) ON DELETE RESTRICT,
    FOREIGN KEY (CouponId) REFERENCES Coupons(Id) ON DELETE SET NULL,
    INDEX idx_order_userid (UserId),
    INDEX idx_order_status (OrderStatus)
);

CREATE TABLE OrderItems (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    TotalPrice DECIMAL(10, 2) NOT NULL, -- Quantity * UnitPrice
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(Id) ON DELETE RESTRICT
);

CREATE TABLE Payments (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    OrderId INT NOT NULL,
    UserId INT NOT NULL,
    TransactionId VARCHAR(100) UNIQUE NULL, -- Razorpay Payment ID
    GatewayOrderId VARCHAR(100) UNIQUE NULL, -- Razorpay Order ID
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentMethod VARCHAR(50),
    Status ENUM('PENDING', 'SUCCESS', 'FAILED') DEFAULT 'PENDING',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    INDEX idx_payment_transaction (TransactionId)
);

-- ==================== 7. DELIVERY & TRACKING ====================

CREATE TABLE DeliveryPartners (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    VehicleType VARCHAR(50),
    VehicleNumber VARCHAR(50),
    DrivingLicense VARCHAR(100),
    IsActive BOOLEAN DEFAULT TRUE,
    IsAvailable BOOLEAN DEFAULT FALSE,
    CurrentLatitude DECIMAL(10, 8),
    CurrentLongitude DECIMAL(11, 8),
    LastLocationUpdatedAt DATETIME,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE TABLE DeliveryLocations (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    DeliveryPartnerId INT NOT NULL,
    Latitude DECIMAL(10, 8) NOT NULL,
    Longitude DECIMAL(11, 8) NOT NULL,
    RecordedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (DeliveryPartnerId) REFERENCES DeliveryPartners(Id) ON DELETE CASCADE
);

CREATE TABLE OrderTracking (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    OrderId INT NOT NULL,
    Status VARCHAR(100) NOT NULL,
    LocationDescription VARCHAR(255),
    Latitude DECIMAL(10, 8),
    Longitude DECIMAL(11, 8),
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE
);

-- ==================== 8. ENGAGEMENT & WALLET ====================

CREATE TABLE Reviews (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ProductId INT NOT NULL,
    UserId INT NOT NULL,
    OrderId INT NOT NULL,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Comment TEXT,
    IsApproved BOOLEAN DEFAULT TRUE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (ProductId) REFERENCES Products(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE
);

CREATE TABLE Notifications (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    Title VARCHAR(100) NOT NULL,
    Message TEXT NOT NULL,
    Type ENUM('ORDER', 'PROMO', 'SYSTEM') DEFAULT 'SYSTEM',
    IsRead BOOLEAN DEFAULT FALSE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    INDEX idx_notification_user (UserId)
);

CREATE TABLE Wallet (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    Balance DECIMAL(10, 2) DEFAULT 0,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE TABLE WalletTransactions (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    WalletId INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    Type ENUM('CREDIT', 'DEBIT') NOT NULL,
    Description VARCHAR(255),
    TransactionDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (WalletId) REFERENCES Wallet(Id) ON DELETE CASCADE
);

CREATE TABLE Banners (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    ImageUrl VARCHAR(500) NOT NULL,
    LinkUrl VARCHAR(500),
    Position ENUM('TOP', 'MIDDLE', 'BOTTOM') DEFAULT 'TOP',
    IsActive BOOLEAN DEFAULT TRUE,
    SortOrder INT DEFAULT 0,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================
-- 9. SEED DATA
-- ==============================================================

-- Seed Roles
INSERT INTO Roles (Name, Description) VALUES 
('Admin', 'System Administrator'),
('Customer', 'Regular Application User'),
('DeliveryPartner', 'Delivery Rider');

-- Seed Admin User (Password: Admin@123 hashed conceptually)
INSERT INTO Users (FullName, Email, Phone, PasswordHash, IsVerified) VALUES 
('Ramniwas Beni Chaurasiya', 'admin@triveni.com', '9876543210', '$2a$11$0n.pS2h91w5/N.gR2a.eYOYR9N1.Z/9R9t8z6r3pU9n.pS2h91w5/', TRUE);

INSERT INTO UserRoles (UserId, RoleId) VALUES (1, 1);

-- Seed Categories
INSERT INTO Categories (Name, Slug, Description) VALUES
('Grocery & Staples', 'grocery-staples', 'Daily needs and staples'),
('Vegetables & Fruits', 'vegetables-fruits', 'Fresh organic veggies and fruits'),
('Puja Samagri', 'puja-samagri', 'All items for daily worship');

-- Seed Products
INSERT INTO Products (CategoryId, Name, Slug, Description, OriginalPrice, SellingPrice, SKU, Weight) VALUES
(1, 'Aashirvaad Atta', 'aashirvaad-atta', 'Whole wheat premium atta', 250.00, 220.00, 'AASH-001', '5kg'),
(2, 'Fresh Onion', 'fresh-onion', 'Freshly farm picked onions', 40.00, 35.00, 'VEG-001', '1kg'),
(3, 'Agarbatti (Incense Sticks)', 'agarbatti', 'Sandalwood fragrance incense', 50.00, 45.00, 'PUJ-001', '100g');

-- Seed Inventory
INSERT INTO Inventory (ProductId, Quantity) VALUES 
(1, 100), (2, 50), (3, 200);

-- End of Script
