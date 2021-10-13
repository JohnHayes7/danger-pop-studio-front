import React, {useState} from 'react'
import SliderContent from './SliderContent'
// import images from './HomePageImages'
import Slide from './Slide'


const Slider = () => {
    const getWidth = () => window.innerWidth
    const images = 'IMG_3450.jpg,IMG_3708.jpg,IMG_3765.jpg,IMG_4156.jpg,IMG_4216.jpg,IMG_4232.jpg,IMG_4233.jpg,IMG_4234.jpg,IMG_4615.jpg,IMG_4921.jpg,IMG_4931.jpg,IMG_5331.jpg,IMG_5517.jpg,IMG_5518.jpg,IMG_5537.jpg,IMG_5557.jpg,IMG_5596.jpg,IMG_5632.jpg,IMG_5683.jpg,IMG_5686.jpg,IMG_5707.jpg,IMG_5737.jpg,IMG_5738.jpg,IMG_5830.jpg,IMG_5835.jpg,IMG_6248.jpg,IMG_6265.jpg,IMG_6267.jpg,IMG_6351.jpg,IMG_6367.jpg,IMG_6382.jpg,IMG_6421.jpg,IMG_6489.jpg,IMG_6500.jpg,IMG_6526.jpg,IMG_6619.jpg,IMG_6744.jpg,IMG_6777.jpg,IMG_6848.jpg,IMG_6882.jpg,IMG_6894.jpg,IMG_7021.jpg,IMG_7075.jpg,IMG_7087.jpg,IMG_7221.jpg,IMG_7252.jpg,IMG_7337.jpg,IMG_7340.jpg,IMG_7343.jpg,IMG_7371.jpg,IMG_7375.jpg,IMG_7492.jpg,IMG_7496.jpg,IMG_7558.jpg,IMG_7561.jpg,IMG_7563.jpg,IMG_7566.jpg,IMG_7567.jpg,IMG_7597.jpg,IMG_7629.jpg,IMG_7716.jpg,IMG_7721.jpg,IMG_7951.jpg,IMG_8106.jpg,IMG_8107.jpg,IMG_8108.jpg,IMG_8125.jpg,IMG_8194.jpg,IMG_8197.jpg,IMG_8202.jpg,IMG_8227.jpg,IMG_8228.jpg,IMG_8229.jpg,IMG_8231.jpg,IMG_8232.jpg,IMG_8234.jpg,IMG_8271.jpg,IMG_8273.jpg,IMG_8388.jpg,IMG_8399.jpg,IMG_8414.jpg,IMG_8468.jpg,IMG_8470.jpg,IMG_8548.jpg,IMG_8558.jpg,IMG_8562.jpg,IMG_8613.jpg,IMG_8643.jpg' 
    const [state, setState] = useState({
        translate: 0,
        transition: 0.45
    })

    const {translate, transition} = state
    // let x = images()
    // debugger
    return(
        <div className='slider'>
            <SliderContent
                translate={translate}
                transition={transition}
                width={getWidth()}
            >
            {images.split(',').map((slide, i) =>{
                // debugger
                return <Slide key={slide + i} content={`https://danger-pop-studio.s3.amazonaws.com/homepageimages/${slide}`}/>
            })}
            </SliderContent>
        </div>
    )      
}

export default Slider