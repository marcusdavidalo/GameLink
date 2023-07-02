import React, { useState } from "react";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import { AllRoutes } from "./routes/AllRoutes";
import AOS from "aos";
import "./App.css";
import "aos/dist/aos.css";

function App() {
  AOS.init();

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
    document.body.classList.toggle("bgimg");
    document.body.classList.toggle("bgimg-light");
  };

  return (
    <div className="App">
      <Navbar
        isDarkMode={isDarkMode}
        handleDarkModeToggle={handleDarkModeToggle}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <AllRoutes setIsLoggedIn={setIsLoggedIn} />
      <Footer
        isDarkMode={isDarkMode}
        handleDarkModeToggle={handleDarkModeToggle}
      />
    </div>
  );
}

export default App;
