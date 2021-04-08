import React from 'react' 
import Navbar from '../Nav/Navbar'
import TattooRequestForm from './TattooRequestForm'

const TattooRequestSuccess = () =>{
    return(
        <div>
            <Navbar />
            <div className="success-message">
                Your Tattoo Request has been succesfully submitted.<br></br>
                A member of the Danger Pop Team will reach out to the email you provided within 1 - 3 business days <br></br>
                Thank you very much for your support!
            </div>
        </div>
    )
}

export default TattooRequestSuccess