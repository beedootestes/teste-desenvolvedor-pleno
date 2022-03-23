-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.7.31 - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para test_beedoo
CREATE DATABASE IF NOT EXISTS `test_beedoo` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `test_beedoo`;

-- Copiando estrutura para tabela test_beedoo.answer
CREATE TABLE IF NOT EXISTS `answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(250) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela test_beedoo.answer: 0 rows
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` (`id`, `description`, `question_id`, `status`, `created`) VALUES
	(1, 'Opção 1 de resposta da pergunta 1', 1, 1, '2022-03-22 23:52:37'),
	(3, 'Opção 2 de resposta da pergunta 1', 1, 1, '2022-03-22 23:52:37'),
	(4, 'Opção 3 de resposta da pergunta 1', 1, 1, '2022-03-22 23:52:37'),
	(5, 'Opção 1 de resposta da pergunta 2', 2, 1, '2022-03-22 23:52:37'),
	(6, 'Opção 2 de resposta da pergunta 2', 2, 1, '2022-03-22 23:52:37'),
	(7, 'Opção 3 de resposta da pergunta 2', 2, 1, '2022-03-22 23:52:37'),
	(8, 'Opção 4 de resposta da pergunta 2', 2, 1, '2022-03-22 23:52:37'),
	(9, 'Opção 5 de resposta da pergunta 2', 2, 1, '2022-03-22 23:52:37'),
	(10, 'Opção 1 de resposta da pergunta 5', 7, 1, '2022-03-22 23:52:37'),
	(11, 'Opção 2 de resposta da pergunta 5', 7, 1, '2022-03-22 23:52:37'),
	(12, 'Opção 1 de resposta da pergunta 7', 12, 1, '2022-03-22 23:52:37'),
	(13, 'Opção 2 de resposta da pergunta 7', 12, 1, '2022-03-22 23:52:37'),
	(14, 'Opção 3 de resposta da pergunta 7', 12, 1, '2022-03-22 23:52:37');
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;

-- Copiando estrutura para tabela test_beedoo.question
CREATE TABLE IF NOT EXISTS `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(250) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela test_beedoo.question: 0 rows
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` (`id`, `description`, `status`, `created`) VALUES
	(1, 'Pergunta de exemplo 1', 1, '2022-03-21 00:24:58'),
	(2, 'Pergunta de exemplo 2', 1, '2022-03-21 00:24:58'),
	(6, 'Pergunta de exemplo 3', 1, '2022-03-22 23:39:45'),
	(5, 'Pergunta de exemplo 4', 1, '2022-03-21 00:51:07'),
	(7, 'Pergunta de exemplo 5', 1, '2022-03-22 23:40:41'),
	(11, 'Pergunta de exemplo 6', 1, '2022-03-23 19:44:05'),
	(12, 'Pergunta de exemplo 7', 1, '2022-03-23 19:44:13'),
	(13, 'Pergunta de exemplo 8', 1, '2022-03-23 19:44:19');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
