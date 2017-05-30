-- ::::::::::::::::::: FUNCIONES CON BASE DE DATOS DCTRES
-- :::::::: TRAER CATALOGOS DE EMPLEOS Y CURSOS
	DROP PROCEDURE IF EXISTS SP_GETCATALOGOS;

	DELIMITER $$

	CREATE PROCEDURE SP_GETCLIENTE()
	BEGIN
		SELECT clave,denominacion, 'curso' AS tipo
			FROM cursos_catalogo
		UNION
		SELECT clave,denominacion, 'empleo' AS tipo
			FROM empleo_catalogo
	END $$
	DELIMITER ;