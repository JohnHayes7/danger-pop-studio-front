import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import {Link} from 'react-router-dom'
import './Navbar.css'




const Navbar = () => {
  return (
    <nav>
      <div className="x">
          <Link to="/"><img height="100 px"  src={"https://danger-pop-studio.s3.amazonaws.com/logos/logo+W+Large.png"} alt={"Yardley Tattoo Logo White"}/></Link>  
      </div>
      <Burger />
    </nav>
  )
}

export default Navbar