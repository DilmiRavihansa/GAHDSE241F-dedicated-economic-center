import  "react";
import { createRoot } from "react-dom/client";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

import HomeFirstPage from "./Home/HomeFirstPage";
import CombineFarmers from "./Routes/CombineFarmers";
import CombineFoods from "./Routes/CombineFoods";
import FarmerProfile from "./UserProfiles/FarmerProfile";
import BuyCardAndPayment from "./PaymentPage/BuyCardAndPayment";
import BuyCardAndPayment2 from "./PaymentPage/BuyCardAndPayment2";
import BuyCardAndPayment3 from "./PaymentPage/BuyCardAndPayment3";
import BuyCardAndPayment4 from "./PaymentPage/BuyCardAndPayment4";
import BuyCardAndPayment5 from "./PaymentPage/BuyCardAndPayment5";
import BuyCardAndPayment6 from "./PaymentPage/BuyCardAndPayment6";
import BuyCardAndPayment7 from "./PaymentPage/BuyCardAndPayment7";
import BuyCardAndPayment8 from "./PaymentPage/BuyCardAndPayment8";
import BuyCardAndPayment9 from "./PaymentPage/BuyCardAndPayment9";
import LoginPage from "./LoginPage/LoginPage";

// Layout component that conditionally renders NavBar
const Layout = ({ children, showNavBar }) => (
  <>
    {showNavBar && <NavBar />}
    {children}
  </>
);
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showNavBar: PropTypes.bool.isRequired,
};

const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      Login page route without NavBar
      <Route 
        path="/" 
        element={
          <Layout showNavBar={false}>
            <LoginPage />
          </Layout>
        } 
      />
      
      {/* All other routes with NavBar */}
      <Route 
        path="/home" 
        element={
          <Layout showNavBar={true}>
            <HomeFirstPage />
          </Layout>
        } 
      />
      <Route 
        path="/farmer" 
        element={
          <Layout showNavBar={true}>
            <CombineFarmers />
          </Layout>
        } 
      />
      <Route 
        path="/product" 
        element={
          <Layout showNavBar={true}>
            <CombineFoods />
          </Layout>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <Layout showNavBar={true}>
            <FarmerProfile />
          </Layout>
        } 
      />
      <Route 
        path="/bellpepper" 
        element={
          <Layout showNavBar={true}>
            <BuyCardAndPayment />
          </Layout>
        } 
      />
      <Route 
        path="/cucumber" 
        element={
          <Layout showNavBar={true}>
            <BuyCardAndPayment2 />
          </Layout>
        } 
      />
      <Route 
        path="/amandine-potato" 
        element={
          <Layout showNavBar={true}>
            <BuyCardAndPayment3 />
          </Layout>
        } 
      />
      <Route 
        path="/carrot" 
        element={
          <Layout showNavBar={true}>
            <BuyCardAndPayment4 />
          </Layout>
        } 
      />
      <Route 
        path="/pineapple" 
        element={
          <Layout showNavBar={true}>
            <BuyCardAndPayment5 />
          </Layout>
        } 
      />
      <Route 
        path="/butterhead-lettuce" 
        element={
          <Layout showNavBar={true}>
            <BuyCardAndPayment6 />
          </Layout>
        } 
      />
      <Route 
        path="/cauliflower" 
        element={
          <Layout showNavBar={true}>
            <BuyCardAndPayment7 />
          </Layout>
        } 
      />
      <Route 
        path="/beetroot" 
        element={
          <Layout showNavBar={true}>
            <BuyCardAndPayment8 />
          </Layout>
        } 
      />
      <Route 
        path="/savoy-cabbage" 
        element={
          <Layout showNavBar={true}>
            <BuyCardAndPayment9 />
          </Layout>
        } 
      />
    </Routes>
  </Router>
);