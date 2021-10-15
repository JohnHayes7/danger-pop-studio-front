import React from 'react'
import './home.css'
import NavBar from '../Nav/Navbar'
import HomePageImages from './HomePageImages'
import Slider from './Slider'



const Home = () =>{
    return(
        <div>
            <NavBar />
            {/* <img className='home-logo' src={"DangerPop_Logo_Red.PNG"} alt="Danger Pop Studio Logo" /> */}
            <div className="home-image-window">
                {/* <div className="home-image-display"> */}
                    <Slider />
                </div>
                
                {/* <h1 className="animated headline-2">Coming Soon</h1>
                <img className='logo' src={"DangerPop_Logo_Black-BackGround.JPG"} alt="Danger Pop Logo" />
                <div className="link-boxes">
                    <div className="box" id="left">
                    <a href={"https://www.instagram.com/danger_pop/?hl=en"}>
                        Tattoo Inquiries Click Here
                    </a>
                    </div>
                    
                    <div className="box" id="right">
                    <a href={"https://www.etsy.com/shop/DangerPopUpShop?ref=simple-shop-header-name&listing_id=880875255"}>
                        Clothing and Artwork Click Here
                    </a>
                    </div>
                    
                </div> */}
            {/* </div> */}
            <div className="social-icons">
                <img className="icon" src="https://danger-pop-studio.s3.amazonaws.com/logos/iconmonstr-instagram-14-240_WHITEBG_CROP.png" alt='instagram logo'/>
                <img className="icon" src='https://danger-pop-studio.s3.amazonaws.com/logos/iconmonstr-twitter-3-240_WHITEBGCROP.png' alt="twitter logo"/>
                <img className="icon" src='https://danger-pop-studio.s3.amazonaws.com/logos/tiktok-128.png' alt="tik-tok logo" />
            </div>
        </div>
    )
}

export default Home