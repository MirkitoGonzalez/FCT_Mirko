-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-06-2020 a las 14:16:10
-- Versión del servidor: 5.7.26
-- Versión de PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `api_rest_laravel`
--
CREATE DATABASE IF NOT EXISTS `api_rest_laravel` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `api_rest_laravel`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Ordenadores', '2020-04-23 00:00:00', '2020-04-23 06:00:00'),
(2, 'Móviles', '2020-04-23 00:00:00', '2020-04-23 07:00:00'),
(3, 'Portátiles', '2020-05-26 13:07:29', '2020-05-26 15:46:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs`
--

DROP TABLE IF EXISTS `logs`;
CREATE TABLE IF NOT EXISTS `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `whodo` varchar(30) NOT NULL DEFAULT 'administrador',
  `descr` varchar(40) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `logs`
--

INSERT INTO `logs` (`id`, `whodo`, `descr`, `fecha`) VALUES
(32, 'Cintia', 'se ha creado un usuario', '2020-06-08 04:24:04'),
(33, 'Sebas', 'se ha creado un usuario', '2020-06-08 04:24:44'),
(34, 'Pinha', 'se ha creado un usuario', '2020-06-08 04:28:34'),
(35, 'sdfsdf', 'se ha creado un usuario', '2020-06-08 04:29:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `user_id` int(255) NOT NULL,
  `category_id` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_user` (`user_id`),
  KEY `fk_post_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `category_id`, `title`, `content`, `image`, `created_at`, `updated_at`) VALUES
(2, 2, 1, 'Asus Rog Strix', 'El mejor portátil que veras en tu vida hulio, es la bomba en persona BUAAAAAAAAAH', 'MSI-GP75Leopard_1590546417.jpg', '2020-04-23 17:00:00', '2020-04-23 18:00:00'),
(19, 1, 1, 'Asus Rog Strix', 'El mejor portátil que veras en tu vida hulio, es la bomba en persona BUAAAAAAAAAH', 'MSI-GP75Leopard_1590546417.jpg', '2020-04-23 17:00:00', '2020-04-23 18:00:00'),
(20, 1, 1, 'Asus Rog Strix', 'El mejor portátil que veras en tu vida hulio, es la bomba en persona BUAAAAAAAAAH', 'MSI-GP75Leopard_1590546417.jpg', '2020-04-23 17:00:00', '2020-04-23 18:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `role`, `email`, `password`, `description`, `image`, `created_at`, `updated_at`, `remember_token`) VALUES
(1, 'admin', 'admin', 'ROLE_ADMIN', 'admin@admin.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '<p>prueba Papa</p>', 'Gustavo_1591388425.jpg', '2020-04-23 00:00:00', '2020-06-05 20:20:30', NULL),
(2, 'Mirko', 'Gonzalez', 'ROLE_USER', 'mirko@gmail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'prueba 1', 'default.png', '2020-05-08 11:27:35', '2020-05-08 11:27:35', NULL),
(3, 'Cintia', 'Romero Vidal', 'ROLE_USER', 'cintiarv03@gmail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '<p>Talasofilia</p>', 'talasofilia_1591410381.jpg', '2020-06-02 14:42:25', '2020-06-06 02:26:21', NULL),
(4, 'Sebas', 'Perez Real', 'ROLE_USER', 'sebass@gmail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '<p>Talasofilia</p>', 'talasofilia_1591410381.jpg', '2020-06-02 14:42:25', '2020-06-06 02:26:21', NULL);

--
-- Disparadores `users`
--
DROP TRIGGER IF EXISTS `user_logActions_after_insert`;
DELIMITER $$
CREATE TRIGGER `user_logActions_after_insert` AFTER INSERT ON `users` FOR EACH ROW INSERT INTO LOGS(logs.id,logs.whodo,logs.descr, logs.fecha)
VALUES(NEW.id,NEW.name,'se ha creado un usuario',now())
$$
DELIMITER ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_post_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `fk_post_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
