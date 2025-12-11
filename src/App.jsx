import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./Global.css";
import ClickSpark from "./components/UI/ClickSpark";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const App = () => {
//! HAVE TO MAKE IT RESPONSIVE

  let {pathname} = useLocation();

  let hidenavRoutes = ["/login","/register"];

  return (
    
    <section className="MainAppBlock" >
      <Toaster />
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={20}
        sparkCount={10}
        duration={200}
      >
        {/* Your content here */}
        {
          !hidenavRoutes.includes(pathname) && <Navbar />
        }
        <Outlet />
      </ClickSpark>
    </section>
  );
};

export default App;
