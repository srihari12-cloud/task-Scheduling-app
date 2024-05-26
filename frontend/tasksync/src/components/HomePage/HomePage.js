import React from 'react';
import { useLocation } from "react-router-dom";
const HomePage = props =>{
  let location = useLocation();
  
  return (
    <div className="container">
      
        
        HOME PAGE <br /> Hello {location.state.user}
    </div>
  );
}

export default HomePage;
