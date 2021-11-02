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
  z-index: 1;
  li {
    padding: 10px;
    font-size: 1em;
  } 

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: rgba(46, 49, 49, .9);
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 45vh;
    width: 150px;
    padding-top: 3.5rem;
    transition: transform 0.1s ease-in-out;
    li {
      color: #fff;
      margin-right: 40px;
    }
    
  }
  @media (max-width: 380px) {
    flex-flow: column nowrap;
    background-color: rgba(46, 49, 49, .9);
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 60%;
    width: 150px;
    padding-top: 3.5rem;
    transition: transform 0.1s ease-in-out;
    li {
      color: #fff;
      margin-right: 40px;
    }
    
  }
`;





const RightNav = ({ open }) => {

  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showArtists, setShowArtists] = useState(false)

  const history = useHistory()

  useEffect(() =>{
    // NEEDS A REFACTOR TO UTILITES
    const token = localStorage.getItem("token")
    if(token){
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

const inOrOut = () => {
  return(
    {
      title: loggedIn ? 'Sign Out' : 'Sign In',
      isAuth: true,
      onClick: () => loggedIn ? history.push('/sign-out') : history.push('/sign-in') 
    }
  )
}

  const menuItemsAry = [
    {
      title: "Home",
      isAuth: true,
      onClick: () => {
        return history.push('/')
      }
    },
    {
      title: "Artists",
      isAuth: true,
      subItems: [
        {title: "Hayes",
        isAuth: true,
        onClick: () => history.push('/artists/hayes')
        },
        {
          title: "Max",
          isAuth: true,
          onClick: () => history.push('/artists/max')
        }
      ],
      // onClick: () => history.push('/artists'),
     
    },
    {
      title: "Our Space",
      isAuth: true,
      onClick: () => history.push('/space')
    },
    {
      title: "Booking",
      isAuth: true,
      onClick: () => history.push('/tattoo-requests')
    },
    {
      title: "FAQ",
      isAuth: true,
      onClick: () => history.push('/faq')
    },   
    {
      title: "Aftercare",
      isAuth: true,
      onClick: () => history.push('/aftercare')
    },
    inOrOut()
  ]

  const displayArtistNames = () => {
    return(
      <ul className="sub-items">
        <li className="sub-item"><Link to="/artists/Hayes">Hayes</Link></li>
        <li className="sub-item"><Link to="/artists/Max">Max</Link></li>
        <li className="sub-item"><Link to="/artists/Mikey">Mikey</Link></li>
      </ul>
    )
  }

  return (
    <div className="menu">
      {/* <Ul open={open}>
        <Navbar  menuItems={menuItemsAry} />
      </Ul> */}
      <Ul open={open}>
       {/* <li>
         <Link to="/">Home</Link>
       </li> */}
       <li id="artists" onMouseEnter={() => setShowArtists(true)} onMouseLeave={() => setShowArtists(false)} onClick={() => setShowArtists(!showArtists)}>
         Artists
         {showArtists ? displayArtistNames() : null}
       </li>
       <li>
         <Link to="/studio">Our Space</Link>
       </li>
       <li>
         <Link to="/tattoo-requests">Bookings</Link>
       </li>
       <li>
         <Link to="/faq">FAQ</Link>
       </li>
       <li>
         <Link to="/aftercare">Aftercare</Link>
       </li>
       <li>
         {loggedIn ? <Link to="/sign-out">Sign Out</Link> : <Link to="/sign-in">Sign In</Link>}
       </li>
     </Ul>
    </div>
    // 

    
  )
}

export default RightNav