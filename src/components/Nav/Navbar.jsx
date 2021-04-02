import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import './Navbar.css'


const Nav = styled.nav`
  width: 100%;
  height: 100px;
  // padding-right: 5%;
  right: 50px;
  border-bottom: 5px solid #f1f1f1;
  display: flex;
  font-size: 1em;
  color: white;
  justify-content: space-between;
  .logo {
   
  }
`

const Navbar = () => {
  return (
    <Nav>
      <div className="x">
          <img height="50 px"  src={"DangerPop_Logo_Red.PNG"} alt={"DangerPop Logo Red "}/>  
      </div>
      <Burger />
    </Nav>
  )
}

export default Navbar