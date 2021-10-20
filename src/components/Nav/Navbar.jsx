import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import './Navbar.css'




const Navbar = () => {
  return (
    <nav>
      <div className="x">
          <img height="50 px"  src={"DangerPop_Logo_Red.PNG"} alt={"DangerPop Logo Red "}/>  
      </div>
      <Burger />
    </nav>
  )
}

export default Navbar