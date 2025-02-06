import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../adminComponents/Layout';
import DashboardGrid from '../adminComponents/dashbord';
import Attendance from '../adminComponents/attendance';
import CustomCalendar from '../adminComponents/CustomCalendar';
import TaskBox from '../adminComponents/taskBox';
import Employee from '../adminComponents/employee';
import LeveComponent from '../adminComponents/LeveComponent';
import HrPolicies from '../adminComponents/hrPolicies';
import HrDocuments from '../adminComponents/hrDocuments';
import Recruitment from '../adminComponents/recruitment';
import Performance from '../adminComponents/performance';
import HelpDesk from '../adminComponents/helpDesk';
import Happy from '../adminComponents/happy';
import Logit from '../adminComponents/logit';
import Yatya from '../adminComponents/yatya';
import P2pComponent from '../adminComponents/p2pComponent';
import Evolve from '../adminComponents/evolve';

import EPFOWebite from '../adminComponents/epfoWebite';
import Policies from '../adminComponents/policies';
import BlueBox from '../adminComponents/blueBox';
import Login from '../Login';
const AdminRoutes = () => {
  return (
  
      <Routes>
       
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardGrid />} />
          <Route path="taskbox" element={<TaskBox />} />
          <Route path="employee" element={<Employee />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leve" element={<LeveComponent />} />
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
        </Route>
      </Routes>
   
  );
};

export default AdminRoutes;
