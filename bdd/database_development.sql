-- MySQL dump 10.13  Distrib 8.0.28, for macos10.15 (x86_64)
--
-- Host: localhost    Database: database_development
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Notes`
--

DROP TABLE IF EXISTS `Notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT '',
  `content` text NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PostId` (`PostId`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notes`
--

LOCK TABLES `Notes` WRITE;
/*!40000 ALTER TABLE `Notes` DISABLE KEYS */;
INSERT INTO `Notes` VALUES (52,'','J\'ai deux, trois astuces que vous peux vous montrer si vous voulez ! On s\'organise un petit visio ensemble très vite pour en parler !',NULL,'2022-03-05 17:07:47','2022-03-05 17:07:47',24),(53,'','Moi aussi j\'ai envie d\'y participer !',NULL,'2022-03-05 17:34:22','2022-03-05 17:34:22',24),(55,'','Faisons une entrevue pour en discuter plus amplement. Ça m\'intéresse.',NULL,'2022-03-05 17:35:56','2022-03-05 17:35:56',23);
/*!40000 ALTER TABLE `Notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) DEFAULT '',
  `content` text NOT NULL,
  `attachment` varchar(255) DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (23,1,'Quels sont les sujets que vous souhaiteriez voir aborder dans l\'espace \"Innovation et futur du travail\" ?','J\'aimerais bien suivre un exposé sur la possibilité ou non de s\'offrir une stabilité financière en travaillant dans le numérique.','http://127.0.0.1:8080/images/4.jpg1646499396742.jpg','2022-03-05 16:56:36','2022-03-05 16:56:36'),(24,1,'Quels trucs utilisez-vous, afin de rester productif au travail ?','Je me fixe toujours des objectifs à atteindre, peu importe le travail, simple soit il ou complexe.\r\n\r\nJ\'aime travailler en groupe plutôt qu\'individuel.\r\n\r\nJe n\'hésite pas à demander l\'aide et les conseils des anciens qui sont plus expérimenté.','http://127.0.0.1:8080/images/b.jpg1646499479463.jpg','2022-03-05 16:57:59','2022-03-05 16:57:59');
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '',
  `firstname` varchar(255) DEFAULT '',
  `email` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT '',
  `description` varchar(255) DEFAULT '',
  `password` varchar(255) NOT NULL,
  `attachment` varchar(255) DEFAULT '',
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'','','admin@test.com','admin','','$2b$10$AjtLraClPDBVxFwZQzSOROtuNVYTfcl678sFC2L/EE6GoteUTwTM2','',1,'2022-03-05 10:41:54','2022-03-05 10:41:54'),(6,'','','danielt@test.com','DanielT','','$2b$10$0H4IA79rzPaY57htTZrOp.d2ayycr5Ux3zNHqCyQEAgz3VzKHYKRa','',0,'2022-03-05 14:21:35','2022-03-05 14:21:35'),(7,'','','sandraw@test.com','SandraW','','$2b$10$sRnqTxdBaIbWM924rQW4W.g9CiU68XlqYkJdOyPatX5J9Z/Wa/uqy','',0,'2022-03-05 14:23:45','2022-03-05 14:23:45'),(8,'','','gaelf@test.com','GaelF','','$2b$10$V0g0zmY3DUXjRBee/qZtsuw/qAwppYPPWnnjZsheGsSoMaLiCKCPK','',0,'2022-03-05 14:24:50','2022-03-05 14:24:50'),(9,'','','davidd@test.com','DavidD','','$2b$10$.71oXca/UH8.BvOjug2REuPMpczwMqmgfx8F5W5PD8cX.oiMpH.EC','',0,'2022-03-05 14:25:32','2022-03-05 14:25:32'),(10,'','','yohanz@test.com','YohanZ','','$2b$10$iy6VOm7WYQrA/7Sk7.86CO9dAmxGkwIi86YFw8swNU86NL7mm9Uty','',0,'2022-03-05 14:35:28','2022-03-05 14:35:28'),(11,'','','sandrines@test.com','SandrineS','','$2b$10$kj2xOtM9tagtctaM7R/kReY1nOcfIBcyVyRE4hYWdOjgDtBHKYaY6','',0,'2022-03-05 14:36:02','2022-03-05 14:36:02'),(12,'','','lead@test.com','LéaD','','$2b$10$U7GJetFdBw31ucsE0ZwXiuGLH2X1T4WY6h9Rs/wQEJL6xKrKX7SZa','http://127.0.0.1:8080/images/5.jpg1646499892871.jpg',0,'2022-03-05 14:36:28','2022-03-05 17:04:52'),(13,'','','patrickd@test.com','PatrickD','','$2b$10$dC1yur8M1YNBmAL5TXO5zeIYKEqmW2YcHlRWUDNORgH1U7tubwWLC','',0,'2022-03-05 14:36:48','2022-03-05 14:36:48'),(15,'','','sophieg@test.com','SophieG','','$2b$10$mK77v7J5.wIsb9zq4.WaweyZcjJT.pyeb67xZsbfE0JxZbXzdfSoW','',0,'2022-03-05 16:11:16','2022-03-05 16:11:16');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-05 18:58:45
