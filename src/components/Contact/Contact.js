import React from 'react'
import NavBar from '../Nav/Navbar'

const Contact = () =>{
    return(
        <div>
            <NavBar />
            <div className="App">
                <h1 className="animated headline-2">Coming Soon</h1>
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
                    
                </div>
            </div>
        </div>
        
    )   
}

export default Contact