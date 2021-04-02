import React from 'react'
import './home.css'
import NavBar from '../Nav/Navbar'


const Home = () =>{
    return(
        <div>
            <NavBar />
            <img className='home-logo' src={"DangerPop_Logo_Red.PNG"} alt="Danger Pop Studio Logo" />
        </div>
    )
}

export default Home