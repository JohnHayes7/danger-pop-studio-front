import React from 'react'
import './home.css'
// import NavBar from '../Nav/Navbar'
import HomePageImages from './HomePageImages'
import Slider from './Slider'
import NavBs from '../Nav/NavBs'



const Home = () =>{
    return(
        <div className='home'>
            <NavBs />
            <div className="home-image-window">
                <Slider />
            </div>
            {/* <div className="social-icons">
                <a href="https://www.instagram.com/danger_pop/?hl=ens" ><img className="icon" src="https://danger-pop-studio.s3.amazonaws.com/logos/iconmonstr-instagram-14-240_WHITEBG_CROP.png" alt='instagram logo'/></a>
                <img className="icon" src='https://danger-pop-studio.s3.amazonaws.com/logos/iconmonstr-twitter-3-240_WHITEBGCROP.png' alt="twitter logo"/>
                <img className="icon" src='https://danger-pop-studio.s3.amazonaws.com/logos/tiktok-128.png' alt="tik-tok logo" />
            </div> */}
        </div>
    )
}

export default Home