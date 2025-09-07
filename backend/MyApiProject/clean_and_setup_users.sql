-- Clean up all existing users and create fresh test users
-- This will ensure we have clean, working test data

-- Delete all existing users (this will cascade delete related data)
DELETE FROM [Posts];
DELETE FROM [Messages];
DELETE FROM [Reports];
DELETE FROM [GroupMembers];
DELETE FROM [Groups];
DELETE FROM [Users];

-- Reset identity columns
DBCC CHECKIDENT ('[Users]', RESEED, 0);
DBCC CHECKIDENT ('[Posts]', RESEED, 0);
DBCC CHECKIDENT ('[Messages]', RESEED, 0);
DBCC CHECKIDENT ('[Reports]', RESEED, 0);
DBCC CHECKIDENT ('[Groups]', RESEED, 0);
DBCC CHECKIDENT ('[GroupMembers]', RESEED, 0);

-- Insert fresh test users with plain text passwords (for testing)
-- The AuthController has been modified to handle both hashed and plain text passwords

-- Admin User
INSERT INTO [Users] ([Username], [Password], [Role], [ProfileImage])
VALUES ('admin', 'admin123', 'Admin', NULL);

-- Regular Users
INSERT INTO [Users] ([Username], [Password], [Role], [ProfileImage])
VALUES ('john_doe', 'password123', 'User', NULL);

INSERT INTO [Users] ([Username], [Password], [Role], [ProfileImage])
VALUES ('jane_smith', 'password123', 'User', NULL);

INSERT INTO [Users] ([Username], [Password], [Role], [ProfileImage])
VALUES ('mike_johnson', 'password123', 'User', NULL);

INSERT INTO [Users] ([Username], [Password], [Role], [ProfileImage])
VALUES ('sarah_wilson', 'password123', 'User', NULL);

-- Insert some sample posts
INSERT INTO [Posts] ([UserId], [Content], [PostImage], [Status])
VALUES (2, 'Just had an amazing day at the beach! 🌊', NULL, 'Approved');

INSERT INTO [Posts] ([UserId], [Content], [PostImage], [Status])
VALUES (3, 'Working on my new project. Excited to share it soon!', NULL, 'Approved');

INSERT INTO [Posts] ([UserId], [Content], [PostImage], [Status])
VALUES (4, 'Beautiful sunset today! 🌅', NULL, 'Pending');

INSERT INTO [Posts] ([UserId], [Content], [PostImage], [Status])
VALUES (5, 'Coffee and coding - perfect combination! ☕', NULL, 'Approved');

-- Insert some sample messages
INSERT INTO [Messages] ([SenderId], [ReceiverId], [MessageContent], [Timestamp])
VALUES (2, 3, 'Hey Jane! How are you doing?', GETDATE());

INSERT INTO [Messages] ([SenderId], [ReceiverId], [MessageContent], [Timestamp])
VALUES (3, 2, 'Hi John! I''m doing great, thanks for asking!', GETDATE());

INSERT INTO [Messages] ([SenderId], [ReceiverId], [MessageContent], [Timestamp])
VALUES (4, 5, 'Can we meet up for coffee sometime?', GETDATE());

PRINT 'Database cleaned and fresh test data inserted!';
PRINT 'Login credentials:';
PRINT 'Admin: username=admin, password=admin123';
PRINT 'Users: username=john_doe, password=password123';
PRINT 'Users: username=jane_smith, password=password123';
PRINT 'Users: username=mike_johnson, password=password123';
PRINT 'Users: username=sarah_wilson, password=password123';
