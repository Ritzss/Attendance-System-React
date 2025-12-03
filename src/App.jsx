import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./Global.css";
import ClickSpark from "./components/UI/ClickSpark";
import { Outlet } from "react-router";
const App = () => {
  return (
    
    <section className="" >
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={20}
        sparkCount={10}
        duration={200}
      >
        {/* Your content here */}
        <Navbar />
        <Outlet />
      </ClickSpark>
    </section>
  );
};

export default App;
