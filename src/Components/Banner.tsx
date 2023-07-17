import { GradientOverlay } from './GradientOverlay'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

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
                    showThumbs={false}
               >

                    <div className="h-[90vh] max-h-[700px] bg-[url('test-image.jpg')] bg-no-repeat bg-cover bg-center">
                         <GradientOverlay />
                    </div>

                    <div className="h-[90vh] max-h-[700px] bg-[url('test-image2.jpg')] bg-no-repeat bg-cover bg-center">
                         <GradientOverlay />
                    </div>

               </Carousel>
          </header >
     )
}