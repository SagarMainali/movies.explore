import { Outlet } from 'react-router-dom'
import { Navbar } from './Components/globalComponents/Navbar'
import { OverlayEffect } from './Components/globalComponents/OverlayEffect'
import { useGlobalContext } from './stateManagement/context'
import { Suspense } from 'react'

export function Layout() {

     const { menuTogglerActive } = useGlobalContext()

     return (
          <div>
               <Navbar />
               <div className='px-3'>
                    {
                         // overlay on top of the GradientOverlay if the main-menu is active
                         menuTogglerActive && <OverlayEffect />
                    }
                    <Suspense>
                         <Outlet />
                    </Suspense>
               </div>
          </div>
     )
}