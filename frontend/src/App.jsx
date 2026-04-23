import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

const App = () => {

  const {showLogin} = useContext(AppContext);

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-20 xl:px-32 2xl:px-40 py-8 bg-gradient-to-b from-teal-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
      <Navbar />
      {showLogin && <Login/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
