-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2025 at 05:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `go_tools`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `address`, `phone`, `created_at`) VALUES
('admin_1748607081231', 'admin123', 'admin@xyz.com', '$2b$10$JldzMfiDPglmsaog3OsWh.5EqAi8/kxKW.2x12iDDPlFN2TbU2pFO', 'admin', 'Bandung', '089123213', '2025-05-30 19:11:21'),
('admin_1748615384705', 'admin12356', 'admin123@xyz.com', '$2b$10$fyfkZEjUU304hbmc6yS1zejHmc5k3yFri0fhZPdx5NjlDlPwf1Jt2', 'admin', 'Bandung', '089123213', '2025-05-30 21:29:44'),
('user1748601841692', 'codebit', 'codebit@xyz.com', '$2b$10$zV3t3leBlrC.WVB9f/y8m.RmqlMni21JhFhESNtB62BWfo/HUFXI6', 'user', 'Bandung', '089123213', '2025-05-30 17:44:01'),
('user1748614820683', '123213', 'uwithelifter@gmail.com', '$2b$10$1w1EhQS4Oyc6K01FvHM2JuKC26s6PPmenw9QPN10I6lDozVki3vSe', 'user', '', '', '2025-05-30 21:20:20'),
('user1748617719643', '123', '123@xyz.com', '$2b$10$Z.a78VQPDYIww3mQLFF9JOQNEjHUwDgf.IUcFCrbUkRn4BSgaGcDi', 'user', 'Bandung', '089123213', '2025-05-30 22:08:39'),
('user1748618286060', 'Muhammad Nahrul Hayat', 'uwi123123@gmail.com', '$2b$10$e1EWjgGBvHawViHMEBe29OQr/FDpSxr8PaHKnwMSriinSbtCmQ1WG', 'user', '112312321', '123213', '2025-05-30 22:18:06'),
('user1748618332936', 'Muhammad Nahrul Hayat', 'xzxcxz@dsadsad.com', '$2b$10$bxMbIm/XS2I18OT.ikeTXO0VLHQPM5..fqhDaETqXW77pW2d9woca', 'user', '3221321', 'd13213', '2025-05-30 22:18:52'),
('user1748618365729', 'Muhammad Nahrul Hayat', '123213@asd.com', '$2b$10$l4kRlTZ0b0.Duh2CCka8luLaji1dQPuJUK9y/BlUlzDZhCpbUy5Ni', 'user', '123213', '123213', '2025-05-30 22:19:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
