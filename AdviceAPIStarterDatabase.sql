-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.40 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.15.0.7171
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for adviceapi
CREATE DATABASE IF NOT EXISTS `adviceapi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `adviceapi`;

-- Dumping structure for table adviceapi.advice
CREATE TABLE IF NOT EXISTS `advice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `advice_description` text NOT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_advice_created_by` (`created_by`),
  KEY `fk_advice_updated_by` (`updated_by`),
  CONSTRAINT `fk_advice_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_advice_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table adviceapi.advice: ~20 rows (approximately)
INSERT IGNORE INTO `advice` (`id`, `advice_description`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
	(1, 'Stay consistent even when progress feels slow.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(2, 'Always document your code and your ideas.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(3, 'Listen more than you speak.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(4, 'Never stop learning new skills.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(5, 'Small improvements every day lead to big results.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(6, 'Focus on solving problems, not complaining about them.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(7, 'Your network is as important as your knowledge.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(8, 'Write clean code that others can understand.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(9, 'Health should always come before work.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(10, 'Ask questions when you do not understand something.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(11, 'Learn from failures instead of fearing them.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(12, 'Discipline beats motivation in the long run.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(13, 'Time management is the key to productivity.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(14, 'Invest in yourself before anything else.', 1, 1, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(15, 'Collaboration often produces better solutions.', 1, 1, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(16, 'Be patient when learning complex topics.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(17, 'Consistency is more important than intensity.', 1, 1, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(18, 'A good plan today is better than a perfect plan tomorrow.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(19, 'Always verify data before making decisions.', 1, 1, '2026-03-08 09:06:32', '2026-03-08 12:08:27'),
	(20, 'Build systems that make work easier for others.', 3, 3, '2026-03-08 09:06:32', '2026-03-08 12:08:27');

-- Dumping structure for table adviceapi.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table adviceapi.users: ~3 rows (approximately)
INSERT IGNORE INTO `users` (`id`, `fullname`, `email`, `username`, `password`, `created_at`) VALUES
	(1, 'Emmanuel Ogwang', 'eogwang@ucu.ac.ug', 'emmanuel.ogwang', '$2b$10$Ldn0S8TV67ZVYd3NVn8gXui8kYFo0gXXXRt9cQ/Ul1.v4yDoRvF.a', '2026-03-08 10:53:35'),
	(2, 'Eric Okello', 'erico@ucu.ac.ug', 'eric.okello', '$2b$10$Ldn0S8TV67ZVYd3NVn8gXui8kYFo0gXXXRt9cQ/Ul1.v4yDoRvF.a', '2026-03-08 10:59:51'),
	(3, 'Akello Erina', 'erina@ucu.ac.ug', 'erina.akello', '$2b$10$2giXxfmI0GpAlaEUaRTyheQnx36UMCZUG9OI2zgoVoQIAh0./MU/K', '2026-03-08 11:01:10');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
