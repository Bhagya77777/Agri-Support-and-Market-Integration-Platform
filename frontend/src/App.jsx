import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import HomePage from './component/Home/HomePage';
import UserMainPage from './component/Home/UserMainPage';

// Online Store
import Store from './component/store/pages/Home/Store';
import Cart from './component/store/pages/Home/Cart';
import Checkout from './component/store/components/checkout';
import MyOrders from './component/store/components/MyOrders';

// Buyer
import BuyerLogin from './component/Buyer/BuyerLogin';
import BuyerSignup from './component/Buyer/BuyerSignup';
import Profile from './component/Buyer/Profile';

//registration
import RegistrationFormHome from './component/registration/RegistrationFormHome';

//logistic
import Logistics from './component/logistics/Logistics';
import WarehouseReqHome from './component/logistics/WarehouseReqHome';
import DeliveryOrderHome from './component/logistics/DeliveryOrderHome';

//agreeSupport
import Home from './component/agreeSupport/pages/Home';
import FarmerFeedback from './component/agreeSupport/pages/FarmerFedback';
import Advice from './component/agreeSupport/pages/Advice';
import SkillDevelopment from './component/agreeSupport/pages/SkillDevelopment';

//admin
import Admin from './component/admin/Admin_home';
import ManageRegistration from './component/admin/ManageRegistration';
import DeliveryTrack from './component/admin/DeliveryTrack';
import ManageWarehouse from './component/admin/ManageWarehouse';
import ManageAdvice from './component/admin/ManageAdvice';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Store" element={<Store cart={cart} setCart={setCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />         
          <Route path="/my-orders" element={<MyOrders />} />

          <Route path="/buyer-login" element={<BuyerLogin />} />
          <Route path="/buyersignup" element={<BuyerSignup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<UserMainPage />} />
          <Route path="/logistic" element={<Logistics />} />

          <Route path="/register" element={<RegistrationFormHome/>} />

        <Route path="/werehouse-reg" element={<WarehouseReqHome />} />
        <Route path="/devlier-order" element={<DeliveryOrderHome />} />

        <Route path="/agreeSupport" element={<Home />} />
        <Route path="/feedback" element={<FarmerFeedback />} />
        <Route path="/advice" element={<Advice />} />
        <Route path="/skill_development" element={<SkillDevelopment />} />
   
        <Route path="/admin_home" element={<Admin/>} />
        <Route path="/admin/registrations" element={<ManageRegistration/>} />
        <Route path="/admin/delivery-orders" element={<DeliveryTrack/>} />
        <Route path="/admin/warehouse-requests" element={<ManageWarehouse/>} />
        <Route path="/admin/advice" element={<ManageAdvice/>} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
