import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AllRoutes } from "./routes/AllRoutes";
import AOS from "aos";
import "./App.css";
import "aos/dist/aos.css";

function App() {
  AOS.init();

  const [isDarkMode, setIsDarkMode] = useState(true);

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
      />
      <AllRoutes />
      <Footer
        isDarkMode={isDarkMode}
        handleDarkModeToggle={handleDarkModeToggle}
      />
    </div>
  );
}

export default App;
