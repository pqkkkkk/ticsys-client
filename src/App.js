import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from './pages/SignIn/SignIn';
import CustomerMainPage from './pages/Customer/CustomerMainPage';
import OrganizerMainPage from './pages/Organizer/OrganizerMainPage';
import SignUp from './pages/SignUp/SignUp';
import RegisterOrganizer from './pages/RegisterOrganizer/RegisterOrganizer';
import Error from './pages/Error/Error';
import EventManagement from './pages/Organizer/EventManagement/EventManagement';
import AdminMainPage from './pages/Admin/AdminMainPage';
import Banking from './pages/Banking/Banking'
import PaymentSuccessNotification from './pages/PaymentNotification/PaymentSuccessNotification';
import PaymentFailedNotification from './pages/PaymentNotification/PaymentFailNotification';
import BankIntegration from './pages/BankIntegration/BankIntegration';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" Component={CustomerMainPage} />
        <Route path="/organizer/*" Component={OrganizerMainPage} />
        <Route path='/organizer/myevents/:eventId/*' element={<EventManagement />}/>
        <Route path="/signin" Component={SignIn} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/become-organizer" Component={RegisterOrganizer} />
        <Route path="/error" Component={Error} />
        <Route path='/admin/*' Component={AdminMainPage}/>
        <Route path='/banking/*' Component={Banking} />
        <Route path='/payment-notification/success' Component={PaymentSuccessNotification} />
        <Route path='/payment-notification/failed' Component={PaymentFailedNotification} />
        <Route path='/bank-integration' Component={BankIntegration} />
      </Routes>
    </Router>
  );
}

export default App;
