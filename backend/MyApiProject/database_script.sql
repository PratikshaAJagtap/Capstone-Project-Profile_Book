IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
CREATE TABLE [Groups] (
    [GroupId] int NOT NULL IDENTITY,
    [GroupName] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Groups] PRIMARY KEY ([GroupId])
);

CREATE TABLE [Users] (
    [UserId] int NOT NULL IDENTITY,
    [Username] nvarchar(max) NOT NULL,
    [Password] nvarchar(max) NOT NULL,
    [Role] nvarchar(max) NOT NULL,
    [ProfileImage] nvarchar(max) NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([UserId])
);

CREATE TABLE [GroupMembers] (
    [Id] int NOT NULL IDENTITY,
    [GroupId] int NOT NULL,
    [UserId] int NOT NULL,
    CONSTRAINT [PK_GroupMembers] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_GroupMembers_Groups_GroupId] FOREIGN KEY ([GroupId]) REFERENCES [Groups] ([GroupId]) ON DELETE CASCADE,
    CONSTRAINT [FK_GroupMembers_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([UserId]) ON DELETE CASCADE
);

CREATE TABLE [Messages] (
    [MessageId] int NOT NULL IDENTITY,
    [SenderId] int NOT NULL,
    [ReceiverId] int NOT NULL,
    [MessageContent] nvarchar(max) NOT NULL,
    [Timestamp] datetime2 NOT NULL,
    CONSTRAINT [PK_Messages] PRIMARY KEY ([MessageId]),
    CONSTRAINT [FK_Messages_Users_ReceiverId] FOREIGN KEY ([ReceiverId]) REFERENCES [Users] ([UserId]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Messages_Users_SenderId] FOREIGN KEY ([SenderId]) REFERENCES [Users] ([UserId]) ON DELETE NO ACTION
);

CREATE TABLE [Posts] (
    [PostId] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [Content] nvarchar(max) NOT NULL,
    [PostImage] nvarchar(max) NULL,
    [Status] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Posts] PRIMARY KEY ([PostId]),
    CONSTRAINT [FK_Posts_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([UserId]) ON DELETE CASCADE
);

CREATE TABLE [Reports] (
    [ReportId] int NOT NULL IDENTITY,
    [ReportedUserId] int NOT NULL,
    [ReportingUserId] int NOT NULL,
    [Reason] nvarchar(max) NOT NULL,
    [Timestamp] datetime2 NOT NULL,
    CONSTRAINT [PK_Reports] PRIMARY KEY ([ReportId]),
    CONSTRAINT [FK_Reports_Users_ReportedUserId] FOREIGN KEY ([ReportedUserId]) REFERENCES [Users] ([UserId]) ON DELETE CASCADE,
    CONSTRAINT [FK_Reports_Users_ReportingUserId] FOREIGN KEY ([ReportingUserId]) REFERENCES [Users] ([UserId]) ON DELETE NO ACTION
);

CREATE INDEX [IX_GroupMembers_GroupId] ON [GroupMembers] ([GroupId]);

CREATE INDEX [IX_GroupMembers_UserId] ON [GroupMembers] ([UserId]);

CREATE INDEX [IX_Messages_ReceiverId] ON [Messages] ([ReceiverId]);

CREATE INDEX [IX_Messages_SenderId] ON [Messages] ([SenderId]);

CREATE INDEX [IX_Posts_UserId] ON [Posts] ([UserId]);

CREATE INDEX [IX_Reports_ReportedUserId] ON [Reports] ([ReportedUserId]);

CREATE INDEX [IX_Reports_ReportingUserId] ON [Reports] ([ReportingUserId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250902114616_InitialCreate', N'9.0.8');

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250903082232_AddUserMessageRelations', N'9.0.8');

COMMIT;
GO

