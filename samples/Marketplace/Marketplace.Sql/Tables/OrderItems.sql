-- Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
-- See License.txt in the project root for license information.

CREATE TABLE OrderItems
(
	Id			INT IDENTITY NOT NULL,
	Active		BIT NOT NULL DEFAULT 1,

	OrderId		INT NOT NULL,
	ProductId	INT NOT NULL,

	Quantity	NUMERIC(15, 3) NOT NULL DEFAULT 0,
	Amount		NUMERIC(15, 3) NOT NULL DEFAULT 0,

	CONSTRAINT PK_OrderItems PRIMARY KEY (Id),
	CONSTRAINT FK_OrderItems_Orders FOREIGN KEY (OrderId) REFERENCES Orders (Id),
	CONSTRAINT FK_OrderItems_Products FOREIGN KEY (ProductId) REFERENCES Products (Id)
)
