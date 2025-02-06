-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2025 at 11:12 AM
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
-- Table structure for table `bank_details`
--

CREATE TABLE `bank_details` (
  `account_holder_name` varchar(255) NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `account_no` int(30) NOT NULL,
  `IFSC_code` varchar(255) NOT NULL,
  `emp_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Table structure for table `educational_background`
--

CREATE TABLE `educational_background` (
  `degree` varchar(255) NOT NULL,
  `institution` text NOT NULL,
  `year_of_passing` int(11) NOT NULL,
  `emp_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_task_box`
--

CREATE TABLE `employee_task_box` (
  `task_id` int(11) NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `task_description` text NOT NULL,
  `task_status` varchar(255) NOT NULL,
  `task_start_date` date NOT NULL,
  `task_end_date` date NOT NULL,
  `emp_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leave_application`
--

CREATE TABLE `leave_application` (
  `leve_app_id` int(5) NOT NULL,
  `leave_type` varchar(50) DEFAULT NULL,
  `leave_start_date` date DEFAULT NULL,
  `leave_end_date` date DEFAULT NULL,
  `leave_days` float DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT NULL,
  `applied_date` date DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `emp_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leave_policy`
--

CREATE TABLE `leave_policy` (
  `earned_leave` int(10) NOT NULL,
  `casual_leave` int(10) NOT NULL,
  `sick_leave` int(10) NOT NULL,
  `total_leave` int(10) NOT NULL,
  `emp_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('Injila', 'injila@gmail.com', 9123456789, 0, 6, 4, '2025-01-01', 'Active', 1, 'read', 'injila@nikatby.com', 'injila@123', 4, 'abcd12345', NULL, NULL, '2025-01-01', 750000.00, 'Permanent', 'NIK-003', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personal_information`
--

CREATE TABLE `personal_information` (
  `permanent_address` text NOT NULL,
  `permanent_city` varchar(255) NOT NULL,
  `permanent_state` varchar(255) NOT NULL,
  `permanent_zip_code` int(10) NOT NULL,
  `current_address` text NOT NULL,
  `current_city` varchar(255) NOT NULL,
  `current_state` varchar(255) NOT NULL,
  `current_zip_code` int(10) NOT NULL,
  `alternate_mob_no` bigint(11) NOT NULL,
  `emergency_person_name` varchar(255) NOT NULL,
  `emergency_relationship` varchar(255) NOT NULL,
  `emergency_mob_no` bigint(11) NOT NULL,
  `emergency_address` text NOT NULL,
  `emp_id` varchar(200) NOT NULL,
  `marital_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `upload_document`
--

CREATE TABLE `upload_document` (
  `doc_id` int(5) NOT NULL,
  `doc_title` text DEFAULT NULL,
  `doc_url` text DEFAULT NULL,
  `doc_status` enum('Pending','Approved','Rejected') DEFAULT NULL,
  `doc_apply_date` date DEFAULT NULL,
  `emp_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bank_details`
--
ALTER TABLE `bank_details`
  ADD KEY `fk_bank_to_master_emp_id` (`emp_id`);

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
-- Indexes for table `educational_background`
--
ALTER TABLE `educational_background`
  ADD KEY `fk_educational_background_to_master` (`emp_id`);

--
-- Indexes for table `employee_task_box`
--
ALTER TABLE `employee_task_box`
  ADD KEY `fk_employee_task_box_to_master` (`emp_id`);

--
-- Indexes for table `leave_application`
--
ALTER TABLE `leave_application`
  ADD PRIMARY KEY (`leve_app_id`),
  ADD KEY `fk_leave_application_to_master` (`emp_id`);

--
-- Indexes for table `leave_policy`
--
ALTER TABLE `leave_policy`
  ADD KEY `fk_leave_policy_to_master` (`emp_id`);

--
-- Indexes for table `master`
--
ALTER TABLE `master`
  ADD PRIMARY KEY (`emp_id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `personal_information`
--
ALTER TABLE `personal_information`
  ADD KEY `fk_personal_information_to_master` (`emp_id`);

--
-- Indexes for table `role_and_permission`
--
ALTER TABLE `role_and_permission`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `upload_document`
--
ALTER TABLE `upload_document`
  ADD PRIMARY KEY (`doc_id`),
  ADD KEY `fk_upload_document_to_master` (`emp_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `dep_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `leave_application`
--
ALTER TABLE `leave_application`
  MODIFY `leve_app_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `master`
--
ALTER TABLE `master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `upload_document`
--
ALTER TABLE `upload_document`
  MODIFY `doc_id` int(5) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bank_details`
--
ALTER TABLE `bank_details`
  ADD CONSTRAINT `fk_bank_to_master_emp_id` FOREIGN KEY (`emp_id`) REFERENCES `master` (`emp_id`);

--
-- Constraints for table `designation`
--
ALTER TABLE `designation`
  ADD CONSTRAINT `designation_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dep_id`);

--
-- Constraints for table `educational_background`
--
ALTER TABLE `educational_background`
  ADD CONSTRAINT `fk_educational_background_to_master` FOREIGN KEY (`emp_id`) REFERENCES `master` (`emp_id`);

--
-- Constraints for table `employee_task_box`
--
ALTER TABLE `employee_task_box`
  ADD CONSTRAINT `fk_employee_task_box_to_master` FOREIGN KEY (`emp_id`) REFERENCES `master` (`emp_id`),
  ADD CONSTRAINT `fk_employee_task_box_to_master_emp_id` FOREIGN KEY (`emp_id`) REFERENCES `master` (`emp_id`);

--
-- Constraints for table `leave_application`
--
ALTER TABLE `leave_application`
  ADD CONSTRAINT `fk_leave_application_to_master` FOREIGN KEY (`emp_id`) REFERENCES `master` (`emp_id`);

--
-- Constraints for table `leave_policy`
--
ALTER TABLE `leave_policy`
  ADD CONSTRAINT `fk_leave_policy_to_master` FOREIGN KEY (`emp_id`) REFERENCES `master` (`emp_id`),
  ADD CONSTRAINT `fk_leave_policy_to_master_emp_id` FOREIGN KEY (`emp_id`) REFERENCES `master` (`emp_id`);

--
-- Constraints for table `personal_information`
--
ALTER TABLE `personal_information`
  ADD CONSTRAINT `fk_personal_information_to_master` FOREIGN KEY (`emp_id`) REFERENCES `master` (`emp_id`);

--
-- Constraints for table `upload_document`
--
ALTER TABLE `upload_document`
  ADD CONSTRAINT `fk_upload_document_to_master` FOREIGN KEY (`emp_id`) REFERENCES `master` (`emp_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
