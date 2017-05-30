-- ::::::::::::::::::: FUNCIONES CON BASE DE DATOS DCTRES
	-- :::::::: TRAER CATALOGOS DE EMPLEOS Y CURSOS
	DROP PROCEDURE IF EXISTS SP_GETCATALOGOS;

	DELIMITER $$

	CREATE PROCEDURE SP_GETCATALOGOS()
	BEGIN
		SELECT clave,denominacion, 'curso' AS tipo
			FROM cursos_catalogo
		UNION
		SELECT clave,denominacion, 'empleo' AS tipo
			FROM empleo_catalogo;
	END $$
	DELIMITER ;

-- :::::::::::: FUNCIONES PARA EMPRESAS ::::::::::::
	-- :::::::::: ALTA DE EMPRESA
	DROP PROCEDURE IF EXISTS SP_ALTAEMPRESA;

	DELIMITER $$

	CREATE PROCEDURE SP_ALTAEMPRESA(
		IN _nombre VARCHAR(500), IN _rfc VARCHAR(200),
		IN _patron VARCHAR(500), IN _representante VARCHAR(500),
		IN _img TEXT
	)
	BEGIN
		INSERT INTO empresas (nombre, rfc, jefe, representante, imagen)
			VALUES (_nombre, _rfc, _patron, _representante, _img);
	END $$
	DELIMITER ;

	-- :::::::::: BAJA DE EMPRESA
	DROP PROCEDURE IF EXISTS SP_BAJAEMPRESA;

	DELIMITER $$

	CREATE PROCEDURE SP_BAJAEMPRESA(
		IN _id INT
	)
	BEGIN
		UPDATE empresas SET status = 0
			WHERE id = _id;
	END $$
	DELIMITER ;

	-- :::::::::: BUSCAR EMPRESAS :::::::
	DROP PROCEDURE IF EXISTS SP_BUSCAREMPRESA;

	DELIMITER $$

	CREATE PROCEDURE SP_BUSCAREMPRESA(
		IN _nombre VARCHAR(500)
	)
	BEGIN
		SELECT id, nombre
			FROM empresas
				WHERE status = 1 AND nombre LIKE CONCAT(_nombre, '%');
	END $$
	DELIMITER ;

	-- :::::::::: BUSCAR EMPRESAS :::::::
	DROP PROCEDURE IF EXISTS SP_GETEMPRESA;

	DELIMITER $$

	CREATE PROCEDURE SP_GETEMPRESA(
		IN _id INT
	)
	BEGIN
		SELECT nombre, rfc, jefe, representante FROM empresas WHERE id = _id;
	END $$
	DELIMITER ;