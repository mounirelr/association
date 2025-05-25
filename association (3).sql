-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 25, 2025 at 09:37 PM
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
  `heure` time(6) DEFAULT NULL,
  `piece_joint` varchar(255) DEFAULT NULL,
  `place_adresse` varchar(255) DEFAULT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `owner_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `evenement`
--

INSERT INTO `evenement` (`id`, `date`, `description`, `etat`, `heure`, `piece_joint`, `place_adresse`, `titre`, `owner_id`) VALUES
(1, '2025-05-31', 'disscussion sur les impacts et les nouveautes de l\'IA', 'Active', '10:30:00.000000', '8a67c365-fcbf-471e-9abc-82e3420cdc8c_conf.jpg', 'Emsi Agdal 2', 'Conference sur IA', 13),
(2, '2025-05-30', 'Atelier pratique pour apprendre les bases du développement web ( Merci d’apporter vos PC)', 'Active', '14:30:00.000000', '73fa2cfc-aa69-4b0a-b97b-8e627cf1cec4_eventsImages.jpg', 'Emsi Agdal 2', 'Atelier Développement Web', 13);

-- --------------------------------------------------------

--
-- Table structure for table `event_participants`
--

CREATE TABLE `event_participants` (
  `user_id` bigint(20) NOT NULL,
  `event_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_participants`
--

INSERT INTO `event_participants` (`user_id`, `event_id`) VALUES
(14, 1),
(15, 1);

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
(13, 'java@gmail.com', 'hassan', 'java', '$2a$10$brjOrThDTqkpte7kKaouZObZkDGIoaaA/eJb/k9F7sborXqBq/9t6', '0654789010', 'Moderateur', 'Active'),
(14, 'radi@gmail.com', 'amine', 'radi', '$2a$10$fWROdCqaH9agdqIfMnF7uuS0iu40tl8fdnkfdlbKt5gebYgVrn3rm', '0678123459', 'Memeber', 'Active'),
(15, 'sabri@gmail.com', 'achraf', 'sabri', '$2a$10$ASviGkXiq1ozuxfBlFJMQOgL2Rc1rx3wm0kKIoGcrohoFDfRDRIm2', '0607651245', 'Memeber', 'Active');

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
  ADD KEY `FK97ksn7nrvrj0aslawemuxe4b3` (`owner_id`);

--
-- Indexes for table `event_participants`
--
ALTER TABLE `event_participants`
  ADD KEY `FKk25pb0sq540xlf1e7klvfvkcc` (`event_id`),
  ADD KEY `FKhryx6nw9yts41qqpbjmspvb4x` (`user_id`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
  ADD CONSTRAINT `FK97ksn7nrvrj0aslawemuxe4b3` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `event_participants`
--
ALTER TABLE `event_participants`
  ADD CONSTRAINT `FKhryx6nw9yts41qqpbjmspvb4x` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKk25pb0sq540xlf1e7klvfvkcc` FOREIGN KEY (`event_id`) REFERENCES `evenement` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
