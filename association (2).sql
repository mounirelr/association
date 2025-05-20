-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 20, 2025 at 06:32 AM
-- Server version: 5.7.44
-- PHP Version: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `association`
--

-- --------------------------------------------------------

--
-- Table structure for table `commentaire`
--

CREATE TABLE `commentaire` (
  `id` bigint(20) NOT NULL,
  `contenu` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `etat` varchar(255) DEFAULT NULL,
  `evenment_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `evenement`
--

CREATE TABLE `evenement` (
  `id` bigint(20) NOT NULL,
  `date` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `etat` varchar(255) DEFAULT NULL,
  `piece_joint` varchar(255) DEFAULT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `heure` time(6) DEFAULT NULL,
  `place_adresse` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `evenement`
--

INSERT INTO `evenement` (`id`, `date`, `description`, `etat`, `piece_joint`, `titre`, `user_id`, `heure`, `place_adresse`) VALUES
(6, '2025-05-18', 'this is test of update', 'Active', '25a4706c-e8b6-4e58-aa3f-d1b9bce5dd72_annonce.png', 'first Evenet test 3', 3, '18:10:00.000000', '17,rue al amal'),
(7, '2025-06-17', 'Une journée dédiée à la compétition amicale entre les différentes agences, avec des matchs de football, de volley-ball et une remise de prix pour les gagnants.', 'Active', 'bd5817dd-346e-4743-9e42-2bece6a8c7b5_eventImage.jpeg', 'Rencontre Sportive Inter-Agences', 3, '14:30:00.000000', 'Complexe Sportif Al Amal, Casablanca'),
(8, '2025-07-12', 'Une rencontre avec des experts du numérique pour discuter des dernières tendances technologiques et de l’impact de l’IA dans les entreprises marocaines.', 'Active', '6fb0b6ef-0ece-4237-a2be-47823822e653_eventImage.jpeg', 'Conférence sur l’Innovation Digitale', 3, '09:30:00.000000', 'Hôtel Kenzi Tower, Casablanca'),
(9, '2025-08-10', 'Apprenez les techniques de narration et de storytelling dans un cadre convivial avec des auteurs marocains reconnus.', 'Active', '5271f462-41f7-4c44-b60a-7a12dad84e7a_eventImage.jpeg', 'Atelier d\'Écriture Créative', 3, '10:00:00.000000', 'Centre Culturel L\'Uzine, Casablanca'),
(10, '2025-06-28', 'Une opportunité de rencontrer des recruteurs, assister à des conférences et déposer son CV auprès d\'entreprises marocaines et internationales.', 'Active', 'd38e8fe4-73d8-4410-98aa-6e76fa3fea5e_eventsImages.jpg', 'Salon de Recrutement des Jeunes Diplômés', 3, '09:00:00.000000', 'Complexe Hay Hassani, Casablanca'),
(11, '2025-06-12', 'Un atelier pratique pour apprendre les bases du développement web avec HTML, CSS et JavaScript. Ouvert à tous les niveaux.', 'Active', 'acfecaa1-b84e-412d-8d1d-527cc6afb5b7_eventsImages.jpg', 'Atelier de Développement Web', 3, '09:30:00.000000', 'Espace Technopark,Rabat'),
(12, '2025-05-24', 'Une conférence dédiée aux dernières avancées en intelligence artificielle.', 'Active', 'cefa0ee6-b874-4959-94bd-d740abdc8840_conf.jpg', 'Conférence sur l\'IA', 3, '10:00:00.000000', 'Emsi Agdal 2');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'Membere',
  `status` varchar(255) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `first_name`, `last_name`, `password`, `phone`, `role`, `status`) VALUES
(3, 'mounir@gmail.com', 'mounir', 'el', '$2a$10$I2tuJMPPObfXzlflmcb78O5olDToGr32FKaR3lnUHnRk5jDA2XmmS', '0612890923', 'Member', 'Active'),
(7, 'sabri@gmail.com', 'karim', 'sabri', '$2a$10$ZwU8kxqPndjwAkrZE8OZtuyKImZ4PGGfFamq5S53DqJTo7.bCi/na', '0678546231', 'Member', 'Active'),
(13, 'java@gmail.com', 'hassan', 'java', '$2a$10$brjOrThDTqkpte7kKaouZObZkDGIoaaA/eJb/k9F7sborXqBq/9t6', '0654789010', 'Member', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `commentaire`
--
ALTER TABLE `commentaire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjqnivdj90px0462c1da89rgio` (`evenment_id`),
  ADD KEY `FKnxdc2ad1nq0dstrheq6tmsoo6` (`user_id`);

--
-- Indexes for table `evenement`
--
ALTER TABLE `evenement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK4btmj6k9iirau40d3j0yj8hbv` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `commentaire`
--
ALTER TABLE `commentaire`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `evenement`
--
ALTER TABLE `evenement`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `commentaire`
--
ALTER TABLE `commentaire`
  ADD CONSTRAINT `FKjqnivdj90px0462c1da89rgio` FOREIGN KEY (`evenment_id`) REFERENCES `evenement` (`id`),
  ADD CONSTRAINT `FKnxdc2ad1nq0dstrheq6tmsoo6` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `evenement`
--
ALTER TABLE `evenement`
  ADD CONSTRAINT `FK4btmj6k9iirau40d3j0yj8hbv` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
