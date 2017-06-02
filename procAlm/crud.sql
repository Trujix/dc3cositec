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
	-- :::::::::: ALTA DE TRABAJADOR :::::::
	DROP PROCEDURE IF EXISTS SP_ALTATRABAJADOR;

	DELIMITER $$

	CREATE PROCEDURE SP_ALTATRABAJADOR(
		IN _nombre VARCHAR(500), IN _curp VARCHAR(200),
		IN _ocupacion VARCHAR(500), IN _puesto VARCHAR(500),
		IN _nomEmpresa VARCHAR(500), IN _idEmpresa INT
	)
	BEGIN
		INSERT INTO trabajadores (nombre, curp, ocupacion, puesto, empresa, idempresa)
			VALUES (_nombre, _curp, _ocupacion, _puesto, _nomEmpresa, _idEmpresa);
	END $$
	DELIMITER ;

	-- :::::::::: EDICION DE TRABAJADOR :::::::
	DROP PROCEDURE IF EXISTS SP_EDITARTRABAJADOR;

	DELIMITER $$

	CREATE PROCEDURE SP_EDITARTRABAJADOR(
		IN _id INT,
		IN _nombre VARCHAR(500), IN _curp VARCHAR(200),
		IN _ocupacion VARCHAR(500), IN _puesto VARCHAR(500),
		IN _empresa VARCHAR(500), IN _idempresa VARCHAR(500)
	)
	BEGIN
		UPDATE trabajadores SET
			nombre = _nombre, 
			curp = _curp, 
			ocupacion = _ocupacion, 
			puesto = _puesto, 
			empresa = _empresa, 
			idempresa = _idempresa
		WHERE id = _id;
		
	END $$
	DELIMITER ;

	-- :::::::::: BAJA DE TRABAJADOR :::::::
	DROP PROCEDURE IF EXISTS SP_BAJATRABAJADOR;

	DELIMITER $$

	CREATE PROCEDURE SP_BAJATRABAJADOR(
		IN _id INT
	)
	BEGIN
		UPDATE trabajadores SET status = 0
			WHERE id = _id;
	END $$
	DELIMITER ;

	-- :::::::::: ALTA DE DOC :::::::
	DROP PROCEDURE IF EXISTS SP_ALTADOCUMENTO;

	DELIMITER $$

	CREATE PROCEDURE SP_ALTADOCUMENTO(
		IN _nombre VARCHAR(500), IN _curp VARCHAR(200),
		IN _ocupacion VARCHAR(500), IN _puesto VARCHAR(500),
		IN _empresa VARCHAR(500), IN _shcp VARCHAR(500),
		IN _curso VARCHAR(500), IN _duracion VARCHAR(200),
		IN _init VARCHAR(500), IN _fin VARCHAR(500),
		IN _clvcurso VARCHAR(500), IN _instructor VARCHAR(500),
		IN _stps VARCHAR(500), IN _patron VARCHAR(500),
		IN _representante VARCHAR(500), IN _imgemp VARCHAR(500),
		IN _imgcurso VARCHAR(500), IN _fecha VARCHAR(500)
	)
	BEGIN
		INSERT INTO docs (nombre, curp, ocupacion, puesto, empresa, shcp, curso, duracion, init, fin, clvcurso, instructor, stps, patron, representante, imgemp, imgcurso, fecha)
			VALUES (_nombre, _curp, _ocupacion, _puesto, _empresa, _shcp, _curso, _duracion, _init, _fin, _clvcurso, _instructor, _stps, _patron, _representante, _imgemp, _imgcurso, _fecha);
	END $$
	DELIMITER ;

	-- :::::::::: BUSCAR DOCUMENTOS :::::::
	DROP PROCEDURE IF EXISTS SP_BUSCARDOCS;

	DELIMITER $$

	CREATE PROCEDURE SP_BUSCARDOCS(
		IN _nombre VARCHAR(500)
	)
	BEGIN
		SELECT id, nombre, empresa, curso, fecha
			FROM docs
				WHERE UPPER(nombre) LIKE UPPER(CONCAT(_nombre, '%'));
	END $$
	DELIMITER ;

	-- :::::::::: TRAER DOCUMENTO :::::::
	DROP PROCEDURE IF EXISTS SP_TRAEDOC;

	DELIMITER $$

	CREATE PROCEDURE SP_TRAEDOC(
		IN _id INT
	)
	BEGIN
		SELECT * FROM docs WHERE id = _id;
	END $$
	DELIMITER ;

	-- :::::::::: BUSCAR TRABAJADOR :::::::
	DROP PROCEDURE IF EXISTS SP_BUSCARTRABAJADOR;

	DELIMITER $$

	CREATE PROCEDURE SP_BUSCARTRABAJADOR(
		IN _dataTrab VARCHAR(500), IN _campo VARCHAR(500)
	)
	BEGIN
		IF _campo = 'curp' THEN
			SELECT * FROM trabajadores
				WHERE status = 1 AND UPPER(curp) LIKE UPPER(CONCAT(_dataTrab, '%'));
		ELSE
			SELECT * FROM trabajadores
				WHERE status = 1 AND UPPER(nombre) LIKE UPPER(CONCAT(_dataTrab, '%'));
		END IF;

	END $$
	DELIMITER ;

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

-- :::::::::::: FUNCIONES PARA USUARIOS ::::::::::::
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