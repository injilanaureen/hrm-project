-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2025 at 08:42 AM
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
-- Database: `hrm`
--

-- --------------------------------------------------------

--
-- Table structure for table `master`
--

CREATE TABLE `master` (
  `id` int(15) NOT NULL,
  `emp_id` int(11) DEFAULT NULL,
  `emp_full_name` varchar(50) DEFAULT NULL,
  `emp_personal_email` varchar(50) DEFAULT NULL,
  `emp_phone_no` bigint(10) DEFAULT NULL,
  `emp_addhar_no` int(12) DEFAULT NULL,
  `emp_pan_card_no` varchar(15) DEFAULT NULL,
  `emp_department` varchar(50) DEFAULT NULL,
  `emp_designation` varchar(50) DEFAULT NULL,
  `emp_join_date` date DEFAULT NULL,
  `emp_status` varchar(50) DEFAULT NULL,
  `role_id` bigint(15) NOT NULL,
  `role_permission` varchar(50) DEFAULT NULL,
  `emp_email` varchar(50) NOT NULL,
  `emp_password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `master`
--

INSERT INTO `master` (`id`, `emp_id`, `emp_full_name`, `emp_personal_email`, `emp_phone_no`, `emp_addhar_no`, `emp_pan_card_no`, `emp_department`, `emp_designation`, `emp_join_date`, `emp_status`, `role_id`, `role_permission`, `emp_email`, `emp_password`) VALUES
(1, NULL, 'Injila naureen', 'injila@gmail.com', 8595800754, 2147483647, 'bjkpn8390j', '6', '4', '2025-01-23', 'Active', 3, 'read', 'injila.naureen@company.com', 'ymu7bufa'),
(2, NULL, 'Injila naureen', 'injila@gmail.com', 8595800754, 2147483647, '6789679679', '2', '8', '2025-01-28', 'Active', 2, 'Read , Write', 'injila.naureen@company.com', 'gu0pa4h1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `master`
--
ALTER TABLE `master`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_role_and_permission_TO_master` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `master`
--
ALTER TABLE `master`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `master`
--
ALTER TABLE `master`
  ADD CONSTRAINT `FK_role_and_permission_TO_master` FOREIGN KEY (`role_id`) REFERENCES `role_and_permission` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
