import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import './Navbar.css'




const Navbar = () => {
  return (
    <nav>
      <div className="x">
          <img height="100 px"  src={"https://danger-pop-studio.s3.amazonaws.com/logos/logo+W+Large.png"} alt={"Yardley Tattoo Logo White"}/>  
      </div>
      <Burger />
    </nav>
  )
}

export default Navbar