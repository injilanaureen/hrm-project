-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2025 at 06:12 AM
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
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dep_id` int(15) NOT NULL,
  `dep_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

CREATE TABLE `designation` (
  `des_id` int(15) DEFAULT NULL,
  `des_name` varchar(50) DEFAULT NULL,
  `dep_id` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `master`
--

CREATE TABLE `master` (
  `emp_id` int(15) NOT NULL,
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

INSERT INTO `master` (`emp_id`, `emp_full_name`, `emp_personal_email`, `emp_phone_no`, `emp_addhar_no`, `emp_pan_card_no`, `emp_department`, `emp_designation`, `emp_join_date`, `emp_status`, `role_id`, `role_permission`, `emp_email`, `emp_password`) VALUES
(21003299, 'Priya Singh', 'priya123@gmail.com', 8808350863, 2147483647, '123ZWE32', 'hr', 'it hr', '2024-12-01', 'active', 2, 'read , write', 'priya@nikatby.com', '1234qwer'),
(2100103244, 'Mohd Alquama', 'mohdalquama1@gmail.com', 9026226199, 2147483647, 'ZXCV1234', 'it', 's/w', '2024-01-16', 'active', 3, 'read', 'Mdalquama@nikatby.com', '1234qwer');

-- --------------------------------------------------------

--
-- Table structure for table `role_and_permission`
--

CREATE TABLE `role_and_permission` (
  `role_id` bigint(15) NOT NULL,
  `role` varchar(50) NOT NULL,
  `permission` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role_and_permission`
--

INSERT INTO `role_and_permission` (`role_id`, `role`, `permission`) VALUES
(1, 'admin', 'all'),
(2, 'hr', 'Read , Write'),
(3, 'employee', 'read');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dep_id`);

--
-- Indexes for table `designation`
--
ALTER TABLE `designation`
  ADD KEY `FK_department_TO_designation` (`dep_id`);

--
-- Indexes for table `master`
--
ALTER TABLE `master`
  ADD PRIMARY KEY (`emp_id`),
  ADD KEY `FK_role_and_permission_TO_master` (`role_id`);

--
-- Indexes for table `role_and_permission`
--
ALTER TABLE `role_and_permission`
  ADD PRIMARY KEY (`role_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `designation`
--
ALTER TABLE `designation`
  ADD CONSTRAINT `FK_department_TO_designation` FOREIGN KEY (`dep_id`) REFERENCES `department` (`dep_id`);

--
-- Constraints for table `master`
--
ALTER TABLE `master`
  ADD CONSTRAINT `FK_role_and_permission_TO_master` FOREIGN KEY (`role_id`) REFERENCES `role_and_permission` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
