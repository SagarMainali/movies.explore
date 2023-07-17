import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function Layout() {
     return (
          <div>
               <Navbar />
               <div className='px-3'>
                    <Outlet />
               </div>
          </div>
     )
}