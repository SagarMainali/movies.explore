import { NavLink } from "react-router-dom"
import '../styles/navbar.css'
import { useState, useEffect } from 'react'

export function Navbar() {

     const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

     function checkScreenSize() {
          if (window.innerWidth < 600) {
               setIsSmallScreen(true)
          }
          else {
               setIsSmallScreen(false)
          }
     }

     useEffect(() => {
          // run whenever the components renders no matter what
          checkScreenSize()

          window.addEventListener('resize', checkScreenSize)

          return () => window.removeEventListener('resize', checkScreenSize)
     }, [])

     return (
          // max-2xl:w-[calc(100%-24px)]
          <div className='fixed w-full max-w-[1500px] z-10 px-3 bg-primary-dark/40'>
               {/* Logo */}
               <div className="h-[50px] flex justify-between items-center relative">

                    <NavLink to='/' className="md:w-[140px] w-[100px]">
                         <img src={'/tmdb-logo.svg'} alt="tmbd-logo" />
                    </NavLink>


                    <div className="flex items-center gap-3">
                         {/* Routes */}
                         <ul className="flex font-medium gap-1">
                              <NavLink to='/movies'
                                   className={({ isActive }) => 'px-2 py-[2px] rounded-md hover:bg-logo-inherit duration-300 hover:text-primary-dark ' + (isActive ? 'active-link' : '')}>Movies</NavLink>
                              <NavLink to='/tvshows'
                                   className={({ isActive }) => 'px-2 py-[2px] rounded-md hover:bg-logo-inherit duration-300 hover:text-primary-dark ' + (isActive ? 'active-link' : '')}>TV Shows</NavLink>
                         </ul>
                         {/* Search */}
                         <div className="rounded-lg md:w-[16rem] w-[12rem] overflow-hidden flex">
                              <input type="text" placeholder="Search..." className="w-[87%] h-[30px] bg-slate-300 text-slate-900 text-sm font-medium caret-slate-900 outline-0 px-4 placeholder:text-slate-900 placeholder:text-sm" />
                              <button className="w-[13%] h-[30px] bg-primary-dark/40" onClick={() => console.log('clicked')}>
                                   <svg className="w-full md:h-[1.2rem] h-[1rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#0FB6DF">
                                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                   </svg>
                              </button>
                         </div>
                    </div>

                    {/* <svg xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 0 448 512" fill="red">
     <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
</svg> */}

               </div>
          </div>
     )
}