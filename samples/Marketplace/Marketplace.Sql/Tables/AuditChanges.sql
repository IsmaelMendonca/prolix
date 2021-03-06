-- Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
-- See License.txt in the project root for license information.

CREATE TABLE AuditChanges
(
	Id		INT IDENTITY NOT NULL,

	FieldName	VARCHAR(128) NOT NULL DEFAULT '',
	NewValue	VARCHAR(5000) NOT NULL DEFAULT '',
	OldValue	VARCHAR(5000) NOT NULL DEFAULT '',
	
	LogId		INT NOT NULL,

	CONSTRAINT PK_AuditChanges PRIMARY KEY (Id),
	CONSTRAINT FK_AuditChanges_AuditLogs FOREIGN KEY (LogId) REFERENCES AuditLogs (Id)
)
