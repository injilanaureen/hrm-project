-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2025 at 10:47 AM
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
  `emp_full_name` varchar(50) DEFAULT NULL,
  `emp_personal_email` varchar(50) DEFAULT NULL,
  `emp_phone_no` bigint(10) DEFAULT NULL,
  `emp_addhar_no` bigint(12) DEFAULT NULL,
  `emp_department` int(11) DEFAULT NULL,
  `emp_designation` int(11) DEFAULT NULL,
  `emp_join_date` date DEFAULT NULL,
  `emp_status` varchar(50) DEFAULT NULL,
  `role_id` bigint(15) NOT NULL,
  `role_permission` varchar(50) DEFAULT NULL,
  `emp_email` varchar(50) NOT NULL,
  `emp_password` varchar(50) NOT NULL,
  `id` int(11) NOT NULL,
  `emp_pan_card_no` varchar(255) NOT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `team_leader_id` int(11) DEFAULT NULL,
  `emp_confirmation_date` date DEFAULT NULL,
  `emp_offered_ctc` decimal(10,2) DEFAULT NULL,
  `emp_empstatus` varchar(50) DEFAULT NULL,
  `emp_id` varchar(200) NOT NULL,
  `emp_gender` varchar(255) NOT NULL,
  `emp_dob` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `master`
--

INSERT INTO `master` (`emp_full_name`, `emp_personal_email`, `emp_phone_no`, `emp_addhar_no`, `emp_department`, `emp_designation`, `emp_join_date`, `emp_status`, `role_id`, `role_permission`, `emp_email`, `emp_password`, `id`, `emp_pan_card_no`, `manager_id`, `team_leader_id`, `emp_confirmation_date`, `emp_offered_ctc`, `emp_empstatus`, `emp_id`, `emp_gender`, `emp_dob`) VALUES
('NIK-001', 'niteshpathak@gmail.com', 8696969696, 0, 1, 5, '2025-01-01', 'Active', 1, 'all', 'nitesh.pathak@nikatby.com', 'nitesh@123', 1, 'ascasdcefccd', NULL, NULL, '2025-01-01', 1200000.00, 'Permanent', 'NIK-001', '', NULL),
('NIK-002', 'priyasharma@gmail.com', 9876543210, 0, 2, 9, '2025-01-01', 'Active', 2, 'Read , Write', 'priya.sharma@nikatby.com', 'priya@123', 2, 'xyzabc123', NULL, NULL, '2025-01-01', 900000.00, 'Permanent', 'NIK-002', '', NULL),
('Injila', 'injila@gmail.com', 9123456789, 0, 6, 4, '2025-01-01', 'Active', 1, 'read', 'injila@nikatby.com', 'injila@123', 4, 'abcd12345', NULL, NULL, '2025-01-01', 750000.00, 'Permanent', 'NIK_003', '', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `master`
--
ALTER TABLE `master`
  ADD PRIMARY KEY (`emp_id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `master`
--
ALTER TABLE `master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
