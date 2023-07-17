import { GradientOverlay } from './GradientOverlay'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { NavLink } from 'react-router-dom'

export function Banner() {

     return (
          <header>
               <Carousel
                    infiniteLoop={true}
                    autoPlay={true}
                    emulateTouch={true}
                    showStatus={false}
                    transitionTime={600}
                    useKeyboardArrows={true}
                    showThumbs={false}>

                    <NavLink to='/details'>
                         <div className="h-[90vh] max-h-[700px] bg-[url('test-image.jpg')] bg-no-repeat bg-cover bg-center">
                              <GradientOverlay />
                         </div>
                    </NavLink>

                    <NavLink to='/details'>
                         <div className="h-[90vh] max-h-[700px] bg-[url('test-image2.jpg')] bg-no-repeat bg-cover bg-center">
                              <GradientOverlay />
                         </div>
                    </NavLink>

               </Carousel>
          </header >
     )
}