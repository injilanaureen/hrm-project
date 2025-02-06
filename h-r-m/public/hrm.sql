-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2025 at 07:30 AM
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
  `dep_id` int(11) NOT NULL,
  `dep_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dep_id`, `dep_name`) VALUES
(1, 'Management'),
(2, 'HR'),
(3, 'Finance'),
(4, 'Digital Marketing'),
(5, 'Customer Care'),
(6, 'IT');

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

CREATE TABLE `designation` (
  `designation_id` int(11) NOT NULL,
  `designation_name` varchar(255) NOT NULL,
  `dept_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`designation_id`, `designation_name`, `dept_id`) VALUES
(1, 'Junior Developer', 6),
(2, 'Full Stack Developer', 6),
(3, 'Frontend Developer', 6),
(4, 'Backend Developer', 6),
(5, 'Manager', 1),
(6, 'Assistant Manager', 1),
(7, 'Team Leader', 1),
(8, 'HR Executive', 2),
(9, 'HR Manager', 2),
(10, 'Recruiter', 2),
(11, 'Junior Accountant', 3),
(12, 'Senior Accountant', 3),
(13, 'Finance Manager', 3),
(14, 'Junior Digital Marketer', 4),
(15, 'Senior Digital Marketer', 4),
(16, 'Digital Marketing Manager', 4),
(17, 'Customer Care Executive', 5),
(18, 'Customer Support Specialist', 5),
(19, 'Customer Service Manager', 5);

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
  `emp_department` int(11) DEFAULT NULL,
  `emp_designation` int(11) DEFAULT NULL,
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
(1, 2202, 'Injila naureen', 'injila@gmail.com', 8595800754, 2147483647, 'bjkpn8390j', 6, 4, '2025-01-23', 'Active', 3, 'read', 'injila.naureen@company.com', 'ymu7bufa'),
(2, 2201, 'Injila naureen', 'injila@gmail.com', 8595800754, 2147483647, '6789679679', 2, 8, '2025-01-28', 'Active', 2, 'Read , Write', 'injila.naureen@company.com', 'gu0pa4h1'),
(3, 2203, 'Punit kumar', 'punitdeveloper1@gmail.com', 8376905677, 2147483647, 'BJKPN8398h', 6, 2, '2025-01-28', 'Inactive', 3, 'read', 'punit.kumar@nikatby.com', '5uvfcdkd'),
(4, NULL, 'Nitesh Pathak', 'niteshpathak@gmail.com', 8595800754, 2147483647, 'bjkpn7767j', 1, 5, '2025-01-01', 'Inactive', 1, 'all', 'nitesh.pathak@nikatby.com', '19oe5v3i');

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
  ADD PRIMARY KEY (`designation_id`),
  ADD KEY `dept_id` (`dept_id`);

--
-- Indexes for table `master`
--
ALTER TABLE `master`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_role_and_permission_TO_master` (`role_id`),
  ADD KEY `fk_department` (`emp_department`),
  ADD KEY `fk_designation` (`emp_designation`);

--
-- Indexes for table `role_and_permission`
--
ALTER TABLE `role_and_permission`
  ADD PRIMARY KEY (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `dep_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `designation`
--
ALTER TABLE `designation`
  MODIFY `designation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `master`
--
ALTER TABLE `master`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `designation`
--
ALTER TABLE `designation`
  ADD CONSTRAINT `designation_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dep_id`);

--
-- Constraints for table `master`
--
ALTER TABLE `master`
  ADD CONSTRAINT `FK_role_and_permission_TO_master` FOREIGN KEY (`role_id`) REFERENCES `role_and_permission` (`role_id`),
  ADD CONSTRAINT `fk_department` FOREIGN KEY (`emp_department`) REFERENCES `department` (`dep_id`),
  ADD CONSTRAINT `fk_designation` FOREIGN KEY (`emp_designation`) REFERENCES `designation` (`designation_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
