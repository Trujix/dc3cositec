-- SCRIPT PARA BASE DE DATOS DOCUMENTOS DC-3 CATALOGO DE EMPLEO
CREATE DATABASE dctres;
USE dctres;

-- ::::::::::: TABLA DE CATALOGO NACIONAL DE EMPLEOS
DROP TABLE IF EXISTS `empleo_catalogo`;
CREATE TABLE IF NOT EXISTS `empleo_catalogo` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`clave` varchar(100) COLLATE utf8_bin DEFAULT NULL,
	`denominacion` varchar(300) COLLATE utf8_bin DEFAULT NULL,
PRIMARY KEY (`id`),
	KEY `clave` (`clave`)
);

-- ::::::::::: TABLA DE CATALOGO DE AREAS TEMATICAS DE CURSOS
DROP TABLE IF EXISTS `cursos_catalogo`;
CREATE TABLE IF NOT EXISTS `cursos_catalogo` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`clave` varchar(100) COLLATE utf8_bin DEFAULT NULL,
	`denominacion` varchar(300) COLLATE utf8_bin DEFAULT NULL,
PRIMARY KEY (`id`),
	KEY `clave` (`clave`)
);

-- ::::::::::: TABLA DE EMPRESAS
DROP TABLE IF EXISTS `empresas`;
CREATE TABLE IF NOT EXISTS `empresas` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`nombre` varchar(400) COLLATE utf8_bin DEFAULT NULL,
	`rfc` varchar(300) COLLATE utf8_bin DEFAULT NULL,
	`jefe` varchar(500) COLLATE utf8_bin DEFAULT NULL,
	`representante` varchar(500) COLLATE utf8_bin DEFAULT NULL,
	`imagen` varchar(500) COLLATE utf8_bin DEFAULT NULL,
	`status` varchar(20) COLLATE utf8_bin DEFAULT '1',
PRIMARY KEY (`id`),
	KEY `rfc` (`rfc`)
);

-- ::::::::::: TABLA DE CURSOS
DROP TABLE IF EXISTS `cursos`;
CREATE TABLE IF NOT EXISTS `cursos` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`idempresa` varchar(400) DEFAULT NULL,
	`nomempresa` varchar(300) COLLATE utf8_bin DEFAULT NULL,
	`curso` varchar(500) COLLATE utf8_bin DEFAULT NULL,
	`duracion` varchar(500) COLLATE utf8_bin DEFAULT NULL,
	`inicio` varchar(500) COLLATE utf8_bin DEFAULT NULL,
	`final` varchar(500) COLLATE utf8_bin DEFAULT NULL,
	`area` varchar(500) COLLATE utf8_bin DEFAULT NULL,
	`instructor` varchar(500) COLLATE utf8_bin DEFAULT NULL,
	`stps` varchar(500) COLLATE utf8_bin DEFAULT NULL,
	`imagen` varchar(500) COLLATE utf8_bin DEFAULT NULL,
	`status` varchar(20) COLLATE utf8_bin DEFAULT '1',
PRIMARY KEY (`id`),
	KEY `idempresa` (`idempresa`)
);

-- ::::::::::::::: TABLA DE USERS
DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`user` varchar(400) DEFAULT NULL,
	`pass` varchar(300) COLLATE utf8_bin DEFAULT NULL,
	`tipo` varchar(300) COLLATE utf8_bin DEFAULT NULL,
	`status` varchar(20) COLLATE utf8_bin DEFAULT '1',
PRIMARY KEY (`id`),
	KEY `user` (`user`)
);

INSERT INTO login (user, pass, tipo) VALUES ('admin', '21232f297a57a5a743894a0e4a801fc3', 'Administrador');

-- ::::::::::: INSERCION DE VALORES TABLAS EMPLEO Y CURSOS
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('01','Cultivo, crianza y aprovechamiento');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('01.1','Agricultura y silvicultura');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('01.2','Ganadería');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('01.3','Pesca y acuacultura');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('02','Extracción y suministro ');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('02.1','Exploración');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('02.2','Extracción');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('02.3','Refinación y beneficio');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('02.4','Provisión de energía ');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('02.5','Provisión de agua');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('03','Construcción');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('03.1','Planeación y dirección de obras ');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('03.2','Edificación y urbanización');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('03.3','Acabado');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('03.4','Instalación y mantenimiento');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('04','Tecnología');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('04.1','Mecánica');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('04.2','Electricidad');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('04.3','Electrónica');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('04.4','Informática');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('04.5','Telecomunicaciones');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('04.6','Procesos industriales');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('05','Procesamiento y fabricación ');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('05.1','Minerales no metálicos');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('05.2','Metales');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('05.3','Alimentos y bebidas');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('05.4','Textiles y prendas de vestir');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('05.5','Materia orgánica');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('05.6','Productos químicos');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('05.7','Productos metálicos y de hule y plástico');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('05.8','Productos eléctricos y electrónicos');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('05.9','Productos impresos');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('06','Transporte');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('06.1','Ferroviario');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('06.2','Autotransporte');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('06.3','Aéreo');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('06.4','Marítimo y fluvial');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('06.5','Servicios de apoyo');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('07','Provisión de bienes y servicios');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('07.1','Comercio');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('07.2','Alimentación y hospedaje');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('07.3','Turismo');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('07.4','Deporte y esparcimiento');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('07.5','Servicios personales');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('07.6','Reparación de artículos de uso doméstico y persona');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('07.7','Limpieza');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('07.8','Servicio postal y mensajería');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('08','Gestión y soporte administrativo');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('08.1','Bolsa, banca y seguros');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('08.2','Administración');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('08.3','Servicios legales');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('09','Salud y protección social');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('09.1','Servicios médicos');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('09.2','Inspección sanitaria y del medio ambiente');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('09.3','Seguridad social');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('09.4','Protección de bienes y/o personas');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('10','Comunicación');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('10.1','Publicación');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('10.2','Radio, cine, televisión y teatro');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('10.3','Interpretación artística');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('10.4','Traducción e interpretación lingüística');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('10.5','Publicidad, propaganda y relaciones públicas');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('11','Desarrollo y extensión del conocimiento');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('11.1','Investigación');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('11.2','Enseñanza');
INSERT INTO empleo_catalogo (clave,denominacion) VALUES ('11.3','Difusión cultural');


INSERT INTO cursos_catalogo (clave,denominacion) VALUES ('1000','Producción general');
INSERT INTO cursos_catalogo (clave,denominacion) VALUES ('2000','Servicios');
INSERT INTO cursos_catalogo (clave,denominacion) VALUES ('3000','Administración, contabilidad y economía');
INSERT INTO cursos_catalogo (clave,denominacion) VALUES ('4000','Comercialización');
INSERT INTO cursos_catalogo (clave,denominacion) VALUES ('5000','Mantenimiento y reparación');
INSERT INTO cursos_catalogo (clave,denominacion) VALUES ('6000','Seguridad');
INSERT INTO cursos_catalogo (clave,denominacion) VALUES ('7000','Desarrollo personal y familiar');
INSERT INTO cursos_catalogo (clave,denominacion) VALUES ('8000','Uso de tecnologías de la información y comunicación');
INSERT INTO cursos_catalogo (clave,denominacion) VALUES ('9000','Participación social');