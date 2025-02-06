import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../hrmComponents/Layout';
import DashboardGrid from '../hrmComponents/dashbord';
import Attendance from '../hrmComponents/attendance';
import CustomCalendar from '../hrmComponents/CustomCalendar';
import TaskBox from '../hrmComponents/taskBox';
import Employee from '../hrmComponents/employee';
import HRMLeaveManagement from '../hrmComponents/hrmLeveComponent';
import HrPolicies from '../hrmComponents/hrPolicies';
import HrDocuments from '../hrmComponents/hrDocuments';
import Recruitment from '../hrmComponents/recruitment';
import Performance from '../hrmComponents/performance';
import HelpDesk from '../hrmComponents/helpDesk';
import Happy from '../hrmComponents/happy';
import Logit from '../hrmComponents/logit';
import Yatya from '../hrmComponents/yatya';
import P2pComponent from '../hrmComponents/p2pComponent';
import Evolve from '../hrmComponents/evolve';

import EPFOWebite from '../hrmComponents/epfoWebite';
import Policies from '../hrmComponents/policies';
import BlueBox from '../hrmComponents/blueBox';

import EmployeeOverview from '../hrmComponents/employeeOverview';
import Personaldetails from '../hrmComponents/personalDetails';



const HrmRouters = () => {
  return (
  
      <Routes>
       
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardGrid />} />
          <Route path="taskbox" element={<TaskBox />} />
          <Route path="employee" element={<Employee />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave" element={<HRMLeaveManagement />} />
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

          <Route path="employeeoverview/:id" element={<EmployeeOverview />} />
          <Route path="personaldetails/:id" element={<Personaldetails />} />


        </Route>
      </Routes>
   
  );
};

export default HrmRouters;
