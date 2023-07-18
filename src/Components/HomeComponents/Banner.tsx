import { GradientOverlay } from './GradientOverlay'
import { NavLink } from 'react-router-dom'

export function Banner() {

     return (
          <header>
               <NavLink to='/movies/123'>
                    <div className="h-[90vh] max-h-[700px] bg-[url('test-image2.jpg')] bg-no-repeat bg-cover bg-center">
                         <GradientOverlay />
                    </div>
               </NavLink>
          </header >
     )
}