import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Navbar from 'reactjs-navbar'
import { Link, useHistory } from 'react-router-dom'
import URL from '../Utilites/Url'
import Loader from 'react-loader-spinner'
import 'reactjs-navbar/dist/index.css'
import './Navbar.css'

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

  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()

  useEffect(() =>{
    // NEEDS A REFACTOR TO UTILITES
    const token = localStorage.getItem("token")
    if(token){
      debugger
        fetch(URL + '/logged_in', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
          setLoggedIn(data.logged_in)
        })
    }else{
      setLoggedIn(false)
    }
}, [])

  const menuItemsAry = [
    {
      title: "Home",
      isAuth: true,
      onClick: () => {
        return history.push('/')
      }
    },
    {
      title: "Bookings",
      isAuth: true,
      onClick: () => history.push('/tattoo-requests')
    }
  ]

  return (
    <div><Navbar  loader={<Loader type="Puff" color="#D85B5B" height={0} width={0} />} 
                  menuItems={menuItemsAry} 

          />
    </div>
    // <Ul open={open}>
    //   <li>
    //     <Link to="/">Home</Link>
    //   </li>
    //   <li>
    //     <Link to="/about">About Us</Link>
    //   </li>
    //   <li>
    //     <Link to="/tattoo-requests">Tattoo Requests</Link>
    //   </li>
    //   <li>
    //     <Link to="/contact">Contact</Link>
    //   </li>
    //   <li>
    //     {loggedIn ? <Link to="/sign-out">Sign Out</Link> : <Link to="/sign-in">Sign In</Link>}
    //   </li>
    // </Ul>

    
  )
}

export default RightNav