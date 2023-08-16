import { useGlobalContext } from './stateManagement/context'
import { Navbar } from './Components/globalComponents/Navbar'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { OverlayEffect } from './Components/globalComponents/OverlayEffect'

export function Layout() {

     const { menuTogglerActive } = useGlobalContext()

     return (
          <div>
               <Navbar />
               {/* this div with px-3 is to sync with the Navbar that also has px-3 */}
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