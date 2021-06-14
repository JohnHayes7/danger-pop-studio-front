import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom'
import SignOut from '../Utilites/Signout'
import axios from 'axios'

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 0px 10px;
    font-size: 1em;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;



const RightNav = ({ open }) => {

  return (
    <Ul open={open}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About Us</Link>
      </li>
      <li>
        <Link to="/tattoo-requests">Tattoo Requests</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/sign-in">Sign In</Link>
      </li>
    </Ul>
  )
}

export default RightNav