import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../employeeComponents/Layout';
import DashboardGrid from '../employeeComponents/dashbord';
import Attendance from '../employeeComponents/attendance';
import CustomCalendar from '../employeeComponents/CustomCalendar';
import TaskBox from '../employeeComponents/taskBox';
import Employee from '../employeeComponents/employee';
import LeveComponent from '../employeeComponents/LeveComponent';
import HrPolicies from '../employeeComponents/hrPolicies';
import HrDocuments from '../employeeComponents/hrDocuments';
import Recruitment from '../employeeComponents/recruitment';
import Performance from '../employeeComponents/performance';
import HelpDesk from '../employeeComponents/helpDesk';
import Happy from '../employeeComponents/happy';
import Logit from '../employeeComponents/logit';
import Yatya from '../employeeComponents/yatya';
import P2pComponent from '../employeeComponents/p2pComponent';
import Evolve from '../employeeComponents/evolve';
import EmployeePersonalDetails from '../employeeComponents/empPersonalDetails';
import EPFOWebite from '../employeeComponents/epfoWebite';
import Policies from '../employeeComponents/policies';
import BlueBox from '../employeeComponents/blueBox';
import Login from '../Login';
import EditPersonalDetails from '../employeeComponents/editpersonaldetails';
import ChangePassword from '../employeeComponents/changePassword';
const EmployeeRouters = () => {
  return (
  
      <Routes>
       
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardGrid />} />
          <Route path="taskbox" element={<TaskBox />} />
          <Route path="employee" element={<Employee />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave" element={<LeveComponent />} />
          <Route path="hrPolicies" element={<HrPolicies />} />
          <Route path="hrDocuments" element={<HrDocuments />} />
          <Route path="recruitment" element={<Recruitment />} />
          <Route path="calendar" element={<CustomCalendar />} />
          <Route path="performance" element={<Performance />} />
          <Route path="helpdesk" element={< HelpDesk />} />
          <Route path="happy" element={<Happy />} />
          <Route path="logit" element={<Logit />} />
          <Route path="yatya" element={<Yatya />} />
          <Route path="p2p" element={<P2pComponent />} />
          <Route path="evolve" element={<Evolve />} />
          <Route path="epfoWebite" element={<EPFOWebite />} />
          <Route path="policies" element={<Policies />} />
          <Route path="bluebox" element={<BlueBox />} />
          <Route path="employeepersonaldetails/:empId" element={<EmployeePersonalDetails />} />
          <Route path="editpersonaldetails/:empId" element={<EditPersonalDetails />} />
          <Route path="changepassword" element={<ChangePassword />} />


        </Route>
      </Routes>
   
  );
};

export default EmployeeRouters;
