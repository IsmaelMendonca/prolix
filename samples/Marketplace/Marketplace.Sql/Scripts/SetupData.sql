-- Copyright 2017 (c) [Denis Da Silva]. All rights reserved.
-- See License.txt in the project root for license information.

/***************************************
* Roles
***************************************/

BEGIN
	PRINT 'Roles';

	DECLARE @Roles TABLE
	(
		Name	VARCHAR(512),
		IsAdmin	BIT 
	);

	-- Source data
	INSERT INTO @Roles(Name, IsAdmin)
	SELECT 'Admin', 1 UNION 
	SELECT 'Dealer', 0 UNION 
	SELECT 'Customer', 0;

	-- Update existing
	UPDATE D SET
		D.IsAdmin = O.IsAdmin
	FROM
		Roles D
		INNER JOIN @Roles O ON O.Name = D.Name;

	-- Populate new
	INSERT INTO [Roles]
	(
		Name, 
		IsAdmin
	)
	SELECT 
		Name, 
		IsAdmin
	FROM
		@Roles
	WHERE
		Name NOT IN (SELECT Name FROM [Roles]);
END;

/***************************************
* Features
***************************************/
BEGIN
	PRINT 'Features';

	DECLARE @Features TABLE
	(
		Name		VARCHAR(512),
		Detail		VARCHAR(512),
		[Path]		VARCHAR(512),
		ParentPath	VARCHAR(512)
	);

	-- Source data
	INSERT INTO @Features(Name, Detail, [Path], ParentPath)
	SELECT 'Categories', '', 'Categories', '' UNION ALL
	SELECT 'Get Categories', '', 'Category/Get', 'Unit' UNION ALL
	SELECT 'Add Categories', '', 'Category/Post', 'Unit';

	-- Update existing
	UPDATE D SET
		D.Name = O.Name,
		D.Detail = O.Detail,
		ParentId = (SELECT Id FROM Features WHERE [Path] = O.ParentPath)
	FROM
		[Features] D
		INNER JOIN @Features O ON O.[Path] = D.[Path];

	-- Populate new
	INSERT INTO Features
	(
		ParentId,
		Name,
		Detail,
		[Path]
	)
	SELECT 
		ParentId = (SELECT Id FROM Features WHERE [Path] = O.ParentPath),
		O.Name, 
		O.Detail, 
		O.[Path]
	FROM
		@Features O
		LEFT JOIN [Features] D ON D.[Path] = O.[Path]
	WHERE
		D.Id IS NULL;
END;

/***************************************
* Permissions
***************************************/
BEGIN
	PRINT 'Permissions';

	DECLARE @Permissions TABLE
	(
		RoleName	VARCHAR(512),
		FeaturePath	VARCHAR(512)
	);

	-- Source data
	INSERT INTO @Permissions(RoleName, FeaturePath)
	SELECT 'Dealer', 'Catetory/Get' UNION ALL
	SELECT 'Dealer', 'Catetory/Add' UNION ALL
	SELECT 'Dealer', 'Catetory/Edit' UNION ALL
	SELECT 'Dealer', 'Catetory/Delete';

	-- Rebuild Permissions
	DELETE FROM Permissions;

	INSERT INTO Permissions
	(
		RoleId, 
		FeatureId
	)
	SELECT 
		P.Id, 
		F.Id
	FROM
		@Permissions O
		INNER JOIN Roles P ON O.RoleName = P.Name
		INNER JOIN Features F ON O.FeaturePath = F.[Path];
END;

/***************************************
* Countries
***************************************/

BEGIN
	PRINT 'Countries';

	-- Populate new
	WITH Source (Name, Abbreviation) AS
	(	
		SELECT 'Brasil', 'BR' UNION
		SELECT 'Unites States', 'US'
	)
	INSERT INTO Countries
	(
		Name, 
		Abbreviation
	)
	SELECT 
		Name, 
		Abbreviation
	FROM
		Source
	WHERE
		Name NOT IN (SELECT Name FROM Countries);
END;

/***************************************
* Provinces
***************************************/

BEGIN
	PRINT 'Provinces';

	DECLARE @Provinces TABLE
	(
		Country	VARCHAR(512),
		[Name]	VARCHAR(512),
		[Abbr]	VARCHAR(512)
	);

	-- Source data
	INSERT INTO @Provinces(Country, [Name], Abbr)
	SELECT 'BR', 'Acre', 'AC' UNION
	SELECT 'BR', 'Alagoas', 'AL' UNION
	SELECT 'BR', 'Amapá', 'AP' UNION
	SELECT 'BR', 'Amazonas', 'AM' UNION
	SELECT 'BR', 'Bahia', 'BA' UNION
	SELECT 'BR', 'Ceará', 'CE' UNION
	SELECT 'BR', 'Distrito Federal', 'DF' UNION
	SELECT 'BR', 'Espírito Santo', 'ES' UNION
	SELECT 'BR', 'Goiás', 'GO' UNION
	SELECT 'BR', 'Maranhão', 'MA' UNION
	SELECT 'BR', 'Mato Grosso', 'MT' UNION
	SELECT 'BR', 'Mato Grosso do Sul', 'MS' UNION
	SELECT 'BR', 'Minas Gerais', 'MG' UNION
	SELECT 'BR', 'Pará', 'PA' UNION
	SELECT 'BR', 'Paraíba', 'PB' UNION
	SELECT 'BR', 'Paraná', 'PR' UNION
	SELECT 'BR', 'Pernambuco', 'PE' UNION
	SELECT 'BR', 'Piauí', 'PI' UNION
	SELECT 'BR', 'Rio de Janeiro', 'RJ' UNION
	SELECT 'BR', 'Rio Grande do Norte', 'RN' UNION
	SELECT 'BR', 'Rio Grande do Sul', 'RS' UNION
	SELECT 'BR', 'Rondônia', 'RO' UNION
	SELECT 'BR', 'Roraima', 'RR' UNION
	SELECT 'BR', 'São Paulo', 'SP' UNION
	SELECT 'BR', 'Santa Catarina', 'SP' UNION
	SELECT 'BR', 'Sergipe', 'SE' UNION
	SELECT 'BR', 'Tocantins', 'TO' UNION
	SELECT 'US', 'Alabama', 'AL' UNION
	SELECT 'US', 'Alaska', 'AK' UNION
	SELECT 'US', 'Arizona', 'AZ' UNION
	SELECT 'US', 'Arkansas', 'AR' UNION
	SELECT 'US', 'California', 'CA' UNION
	SELECT 'US', 'Colorado', 'CO' UNION
	SELECT 'US', 'Connecticut', 'CT' UNION
	SELECT 'US', 'Delaware', 'DE' UNION
	SELECT 'US', 'Florida', 'FL' UNION
	SELECT 'US', 'Georgia', 'GA' UNION
	SELECT 'US', 'Hawaii', 'HI' UNION
	SELECT 'US', 'Idaho', 'ID' UNION
	SELECT 'US', 'Illinois', 'IL' UNION
	SELECT 'US', 'Indiana', 'IN' UNION
	SELECT 'US', 'Iowa', 'IA' UNION
	SELECT 'US', 'Kansas', 'KS' UNION
	SELECT 'US', 'Kentucky', 'KY' UNION
	SELECT 'US', 'Louisiana', 'LA' UNION
	SELECT 'US', 'Maine', 'ME' UNION
	SELECT 'US', 'Maryland', 'MD' UNION
	SELECT 'US', 'Massachusetts', 'MA' UNION
	SELECT 'US', 'Michigan', 'MI' UNION
	SELECT 'US', 'Minnesota', 'MN' UNION
	SELECT 'US', 'Mississippi', 'MS' UNION
	SELECT 'US', 'Missouri', 'MO' UNION
	SELECT 'US', 'Montana', 'MT' UNION
	SELECT 'US', 'Nebraska', 'NE' UNION
	SELECT 'US', 'Nevada', 'NV' UNION
	SELECT 'US', 'New Hampshire', 'NH' UNION
	SELECT 'US', 'New Jersey', 'NJ' UNION
	SELECT 'US', 'New Mexico', 'NM' UNION
	SELECT 'US', 'New York', 'NY' UNION
	SELECT 'US', 'North Carolina', 'NC' UNION
	SELECT 'US', 'North Dakota', 'ND' UNION
	SELECT 'US', 'Ohio', 'OH' UNION
	SELECT 'US', 'Oklahoma', 'OK' UNION
	SELECT 'US', 'Oregon', 'OR' UNION
	SELECT 'US', 'Pennsylvania', 'PA' UNION
	SELECT 'US', 'Rhode Island', 'RI' UNION
	SELECT 'US', 'South Carolina', 'SC' UNION
	SELECT 'US', 'South Dakota', 'SD' UNION
	SELECT 'US', 'Tennessee', 'TN' UNION
	SELECT 'US', 'Texas', 'TX' UNION
	SELECT 'US', 'Utah', 'UT' UNION
	SELECT 'US', 'Vermont', 'VT' UNION
	SELECT 'US', 'Virginia', 'VA' UNION
	SELECT 'US', 'Washington', 'WA' UNION
	SELECT 'US', 'West Virginia', 'WV' UNION
	SELECT 'US', 'Wisconsin', 'WI' UNION
	SELECT 'US', 'Wyoming', 'WY';
	
	INSERT INTO Provinces
	(
		Name, 
		Abbreviation,
		CountryId
	)
	SELECT 
		S.Name, 
		S.Abbr,
		C.ID
	FROM
		@Provinces S
		INNER JOIN Countries C ON C.Abbreviation = S.Country
		LEFT JOIN Provinces P ON P.CountryId = C.Id AND P.Abbreviation = S.Abbr
	WHERE
		P.Id IS NULL;
END;

/***************************************
* Settings
***************************************/

BEGIN
	PRINT 'Settings';

	DECLARE @Settings TABLE
	(
		Name	VARCHAR(512),
		Value	VARCHAR(512)
	);

	-- Source data
	INSERT INTO @Settings(Name, Value)
	SELECT 'CustomerRole', 'Customer' UNION 
	SELECT 'DealerRole', 'Dealer'

	-- Update existing
	UPDATE D SET
		D.Value = O.Value
	FROM
		Settings D
		INNER JOIN @Settings O ON O.Name = D.Name;

	-- Populate new
	INSERT INTO [Settings]
	(
		Name, 
		Value
	)
	SELECT 
		Name, 
		Value
	FROM
		@Settings
	WHERE
		Name NOT IN (SELECT Name FROM [Settings]);
END;

/***************************************
* Status Types
***************************************/

BEGIN
	PRINT 'Status Types';

	DECLARE @StatusTypes TABLE
	(
		Name	VARCHAR(512)
	);

	-- Source data
	INSERT INTO @StatusTypes(Name)
	SELECT 'Opened' UNION 
	SELECT 'Pending' UNION 
	SELECT 'Close' UNION 
	SELECT 'Cancelled';

	-- Populate new
	INSERT INTO StatusTypes
	(
		Name
	)
	SELECT 
		Name
	FROM
		@StatusTypes
	WHERE
		Name NOT IN (SELECT Name FROM [StatusTypes]);
END;
