-- Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
-- See License.txt in the project root for license information.

CREATE TABLE AuditLogs
(
	Id		INT IDENTITY NOT NULL,
	Active	BIT NOT NULL DEFAULT 1,

	[Date]		DATETIME NOT NULL DEFAULT GETDATE(),
	Detail		VARCHAR(4096) NOT NULL DEFAULT '',
	ModelId		INT,

	UserId		INT,
	FeatureId	INT,

	CONSTRAINT PK_AuditLogs PRIMARY KEY (Id),
	CONSTRAINT FK_AuditLogs_Users FOREIGN KEY (UserId) REFERENCES Users (Id),
	CONSTRAINT FK_AuditLogs_Features FOREIGN KEY (FeatureId) REFERENCES Features (Id)
)
