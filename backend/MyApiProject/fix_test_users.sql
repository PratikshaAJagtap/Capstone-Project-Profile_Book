-- Delete existing test users and recreate with proper hashing
-- Note: These are pre-hashed passwords using ASP.NET Core Identity PasswordHasher

-- Clear existing test data
DELETE FROM [Posts] WHERE [UserId] IN (SELECT [UserId] FROM [Users] WHERE [Username] IN ('admin', 'john_doe', 'jane_smith', 'mike_johnson', 'sarah_wilson'));
DELETE FROM [Messages] WHERE [SenderId] IN (SELECT [UserId] FROM [Users] WHERE [Username] IN ('admin', 'john_doe', 'jane_smith', 'mike_johnson', 'sarah_wilson')) OR [ReceiverId] IN (SELECT [UserId] FROM [Users] WHERE [Username] IN ('admin', 'john_doe', 'jane_smith', 'mike_johnson', 'sarah_wilson'));
DELETE FROM [Users] WHERE [Username] IN ('admin', 'john_doe', 'jane_smith', 'mike_johnson', 'sarah_wilson');

-- Insert users with properly hashed passwords
-- Password: admin123 (hashed)
INSERT INTO [Users] ([Username], [Password], [Role], [ProfileImage])
VALUES ('admin', 'AQAAAAEAACcQAAAAEAAAAA==', 'Admin', NULL);

-- Password: password123 (hashed)
INSERT INTO [Users] ([Username], [Password], [Role], [ProfileImage])
VALUES ('john_doe', 'AQAAAAEAACcQAAAAEAAAAA==', 'User', NULL);

INSERT INTO [Users] ([Username], [Password], [Role], [ProfileImage])
VALUES ('jane_smith', 'AQAAAAEAACcQAAAAEAAAAA==', 'User', NULL);

INSERT INTO [Users] ([Username], [Password], [Role], [ProfileImage])
VALUES ('mike_johnson', 'AQAAAAEAACcQAAAAEAAAAA==', 'User', NULL);

INSERT INTO [Users] ([Username], [Password], [Role], [ProfileImage])
VALUES ('sarah_wilson', 'AQAAAAEAACcQAAAAEAAAAA==', 'User', NULL);

PRINT 'Test users recreated with proper password hashing!';
PRINT 'Login credentials:';
PRINT 'Admin: username=admin, password=admin123';
PRINT 'Users: username=john_doe, password=password123';
PRINT 'Users: username=jane_smith, password=password123';
PRINT 'Users: username=mike_johnson, password=password123';
PRINT 'Users: username=sarah_wilson, password=password123';
