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
	-- :::::::::: ALTA DE EMPRESA :::::::
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

	-- :::::::::: BAJA DE EMPRESA :::::::
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

	-- :::::::::: EDICION DE EMPRESA :::::::
	DROP PROCEDURE IF EXISTS SP_EDITAREMPRESA;

	DELIMITER $$

	CREATE PROCEDURE SP_EDITAREMPRESA(
		IN _id INT, IN _nombre VARCHAR(500), 
		IN _rfc VARCHAR(200), IN _patron VARCHAR(500), 
		IN _representante VARCHAR(500), IN _img TEXT
	)
	BEGIN
		IF _img = 'noeditar' THEN
			UPDATE empresas SET
				nombre = _nombre,
				 rfc = _rfc,
				 jefe = _patron,
				 representante = _representante
			WHERE id = _id;
		ELSE
			UPDATE empresas SET
				nombre = _nombre,
				 rfc = _rfc,
				 jefe = _patron,
				 representante = _representante,
				 imagen = _img
			WHERE id = _id;
		END IF;
		
	END $$
	DELIMITER ;

	-- :::::::::: BUSCAR EMPRESAS :::::::
	DROP PROCEDURE IF EXISTS SP_BUSCAREMPRESA;

	DELIMITER $$

	CREATE PROCEDURE SP_BUSCAREMPRESA(
		IN _nombre VARCHAR(500)
	)
	BEGIN
		SELECT id, nombre, rfc
			FROM empresas
				WHERE status = 1 AND UPPER(nombre) LIKE UPPER(CONCAT(_nombre, '%'));
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


-- :::::::::::: FUNCIONES PARA CURSOS ::::::::::::
	-- :::::::::: ALTA DE CURSOS :::::::
	DROP PROCEDURE IF EXISTS SP_ALTACURSO;

	DELIMITER $$

	CREATE PROCEDURE SP_ALTACURSO(
		IN _idEmpresa VARCHAR(500), IN _nomEmpresa VARCHAR(200),
		IN _curso VARCHAR(500), IN _duracion VARCHAR(500),
		IN _inicio VARCHAR(500), IN _fin VARCHAR(500),
		IN _area VARCHAR(500), IN _instructor VARCHAR(500), IN _stps VARCHAR(500), IN _img TEXT
	)
	BEGIN
		INSERT INTO cursos (idempresa, nomempresa, curso, duracion, inicio, final, area, instructor, stps, imagen)
			VALUES (_idEmpresa, _nomEmpresa, _curso, _duracion, _inicio, _fin, _area, _instructor, _stps, _img);
	END $$
	DELIMITER ;

	-- :::::::::: BAJA DE CURSOS :::::::
	DROP PROCEDURE IF EXISTS SP_BAJACURSO;

	DELIMITER $$

	CREATE PROCEDURE SP_BAJACURSO(
		IN _id INT
	)
	BEGIN
		UPDATE cursos SET status = 0
			WHERE id = _id;
	END $$
	DELIMITER ;

	-- :::::::::: EDICION DE CURSOS :::::::
	DROP PROCEDURE IF EXISTS SP_EDITARCURSO;

	DELIMITER $$

	CREATE PROCEDURE SP_EDITARCURSO(
		IN _id INT,
		IN _idEmpresa VARCHAR(500), IN _nomEmpresa VARCHAR(200),
		IN _curso VARCHAR(500), IN _duracion VARCHAR(500),
		IN _inicio VARCHAR(500), IN _fin VARCHAR(500),
		IN _area VARCHAR(500), IN _instructor VARCHAR(500),IN _stps VARCHAR(500), IN _img TEXT
	)
	BEGIN
		IF _img = 'noeditar' THEN
			UPDATE cursos SET
				idempresa = _idEmpresa, 
				nomempresa = _nomEmpresa, 
				curso = _curso, 
				duracion = _duracion, 
				inicio = _inicio, 
				final = _fin, 
				area = _area,
				instructor = _instructor,
				stps = _stps
			WHERE id = _id;
		ELSE
			UPDATE cursos SET
				idempresa = _idEmpresa, 
				nomempresa = _nomEmpresa, 
				curso = _curso, 
				duracion = _duracion, 
				inicio = _inicio, 
				final = _fin, 
				area = _area,
				instructor = _instructor,
				stps = _stps, 
				imagen = _img
			WHERE id = _id;
		END IF;
		
	END $$
	DELIMITER ;

	-- :::::::::: BUSCAR CURSOS :::::::
	DROP PROCEDURE IF EXISTS SP_BUSCARCURSO;

	DELIMITER $$

	CREATE PROCEDURE SP_BUSCARCURSO(
		IN _nombre VARCHAR(500)
	)
	BEGIN
		SELECT id, nomempresa, curso
			FROM cursos
				WHERE status = 1 AND UPPER(curso) LIKE UPPER(CONCAT(_nombre, '%'));
	END $$
	DELIMITER ;

	-- :::::::::: BUSCAR EMPRESAS :::::::
	DROP PROCEDURE IF EXISTS SP_GETCURSO;

	DELIMITER $$

	CREATE PROCEDURE SP_GETCURSO(
		IN _id INT
	)
	BEGIN
		SELECT idempresa, nomempresa, curso, duracion, inicio, final, area, instructor, stps FROM cursos WHERE id = _id;
	END $$
	DELIMITER ;

-- :::::::::::: FUNCIONES PARA TRABAJADORES ::::::::::::
	-- :::::::::: BUSQUEDA CURSOS POR ID EMPRESA :::::::
	DROP PROCEDURE IF EXISTS SP_GETCURSOEMPRESA;

	DELIMITER $$

	CREATE PROCEDURE SP_GETCURSOEMPRESA(
		IN _id INT
	)
	BEGIN
		SELECT * FROM cursos WHERE idempresa = _id;
	END $$
	DELIMITER ;

	-- :::::::::: BUSQUEDA DATOS EMPRESA DOC :::::::
	DROP PROCEDURE IF EXISTS SP_GETDATAEMPRESA;

	DELIMITER $$

	CREATE PROCEDURE SP_GETDATAEMPRESA(
		IN _id INT
	)
	BEGIN
		SELECT * FROM empresas WHERE id = _id;
	END $$
	DELIMITER ;

	-- :::::::::: BUSQUEDA DATOS CURSOS DOC :::::::
	DROP PROCEDURE IF EXISTS SP_GETDATACURSOS;

	DELIMITER $$

	CREATE PROCEDURE SP_GETDATACURSOS(
		IN _id INT
	)
	BEGIN
		SELECT * FROM cursos WHERE id = _id;
	END $$
	DELIMITER ;

-- :::::::::::: FUNCIONES PARA TRABAJADORES ::::::::::::
	-- ::::::::::: FUNCIONES DE USUARIOS
	DROP PROCEDURE IF EXISTS SP_GETLOGIN;

	DELIMITER $$

	CREATE PROCEDURE SP_GETLOGIN(
		IN _user VARCHAR(500), IN _pass VARCHAR(500)
	)
	BEGIN
		SELECT COUNT(*) C FROM login WHERE user = _user AND pass = _pass;
	END $$
	DELIMITER ;