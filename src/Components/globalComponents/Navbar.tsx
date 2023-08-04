import { NavLink, useNavigate, useLocation } from "react-router-dom"
import '../../styles/navbar.css'
import { useGlobalContext } from '../../stateManagement/context'
import { ChangeEvent, KeyboardEvent, useEffect, useState, useRef } from "react"

export function Navbar() {

     const { pathname } = useLocation()

     const { menuTogglerActive, changeMenuTogglerState } = useGlobalContext()

     const navigate = useNavigate()

     const searchQuery = useRef<string>('')

     const [emptyField, setEmptyField] = useState<boolean>(false)

     function handleChange(event: ChangeEvent<HTMLInputElement>) {
          setEmptyField(false)
          searchQuery.current = event.target.value
     }

     function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
          if (event.key === 'Enter') {
               goToPath()
          }
     }

     function goToPath() {
          if (searchQuery.current) {
               setEmptyField(false)
               navigate(`/search/${searchQuery.current}`)
          }
          else {
               setEmptyField(true)
          }
     }

     const [hideNavbar, setHideNavbar] = useState<boolean>(false)

     // const [prevScrollY, setPrevScrollY] = useState<number>(0)
     const prevScrollY = useRef<number>(0)

     // to change background color of navbar based on scrollposition
     const [crossed300, setCrossed300] = useState<boolean>(false)

     useEffect(() => {
          setHideNavbar(false)
     }, [pathname])

     useEffect(() => {
          function handleNavbar() {
               const currentScrollY = window.scrollY
               if (currentScrollY > 300) {
                    setCrossed300(true)
                    if (currentScrollY > prevScrollY.current && !menuTogglerActive) {
                         setHideNavbar(true)
                    } else {
                         setHideNavbar(false)
                    }
               }
               else {
                    setCrossed300(false)
               }
               prevScrollY.current = currentScrollY
          }

          window.addEventListener('scroll', handleNavbar)

          return () => { window.removeEventListener('scroll', handleNavbar) }
     }, [prevScrollY.current])
     // the dependecy prevScrollY is very important here because it lets the useEffect run everytime the componenet re-renders and if its value has
     // been changed. so everytime the useEffect runs it creates a new closure for the function handleNavbar then only it can refer to the latest
     // updated state value of the prevScrollY otherwise if there is no dependency provided the useEffect will not run on the next render and then
     // it keeps on refering to the same old closure of the handleNavbar function that was created at the initial render of the component. due to
     // this although the prevScrollY is being updated inside the function with the latest value but it is still refering the same value which was
     // 0 when the useEffect ran for the first time
     // *this problem gets solved when we just use useRef instead of useState variable - by using useRef we no longer need to use dependency *

     return (
          // max-2xl:w-[calc(100%-24px)]
          <div
               className={`fixed w-full max-w-[1500px] z-50 px-3 duration-300 
               ${hideNavbar ? '-translate-y-[100%]' : ''} 
               ${pathname === '/' && !crossed300 ? 'bg-primary-dark/40' : 'bg-primary-dark/80 backdrop-blur-sm'}`}>
               {/* Logo */}
               <div className="h-[50px] flex justify-between items-center">

                    <NavLink to='/' className="md:w-[140px] min-w-[120px]">
                         <img src={'/tmdb-logo.svg'} alt="tmbd-logo" />
                    </NavLink>

                    {/* dymanic class - (above sm - dont' translate at all, keep menu where it is) (below sm - translate -100% and upon toggling translate to default i.e 0)*/}
                    <div className={`flex items-center gap-3 menu-main duration-300 md:translate-x-0 -translate-x-[100%] 
                         ${menuTogglerActive ? 'translate-x-0' : ''} `}>

                         {/* Routes */}
                         <ul className="flex font-medium text-sm gap-2 menu-links">
                              <NavLink to='/'
                                   className={({ isActive }) =>
                                        'px-2 py-[3px] rounded-md hover:bg-logo-inherit duration-300 md:hidden hover:text-primary-dark ' + (isActive ? 'active-link' : '')}>Home</NavLink>
                              <NavLink to='/movies'
                                   className={({ isActive }) =>
                                        'px-2 py-[3px] rounded-md hover:bg-logo-inherit duration-300 hover:text-primary-dark ' + (isActive ? 'active-link' : '')}>Movies</NavLink>
                              <NavLink to='/tvshows'
                                   className={({ isActive }) =>
                                        'px-2 py-[3px] rounded-md hover:bg-logo-inherit duration-300 hover:text-primary-dark ' + (isActive ? 'active-link' : '')}>TV Shows</NavLink>
                         </ul>

                         {/* Search */}
                         <div className="rounded-lg sm:w-[14rem] w-full overflow-hidden flex">
                              <input type="text"
                                   placeholder={emptyField ? 'Field is empty...' : "Search..."}
                                   onChange={handleChange}
                                   onKeyDown={handleKeyPress}
                                   className={`w-[87%] h-[30px] bg-slate-200 text-slate-900 text-sm font-medium caret-slate-900 outline-0 px-4 
                                   placeholder:text-sm ${emptyField ? 'placeholder:text-red-900' : 'placeholder:text-slate-900'}`} />
                              <button className="w-[13%] h-[30px] bg-slate-300" onClick={goToPath}>
                                   <svg className="w-full md:h-[1.1rem] h-[1rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#001C30">
                                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                   </svg>
                              </button>
                         </div>
                    </div>

                    <div className="menu-toggler cursor-pointer hidden">
                         {
                              menuTogglerActive
                                   ?
                                   <svg xmlns="http://www.w3.org/2000/svg" height="1.3rem" viewBox="0 0 384 512" fill="#0FB6DF"
                                        onClick={changeMenuTogglerState}>
                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                   </svg>
                                   :
                                   <svg xmlns="http://www.w3.org/2000/svg" height="1.4rem" viewBox="0 0 448 512" fill="#0FB6DF"
                                        onClick={changeMenuTogglerState}>
                                        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                                   </svg>
                         }
                    </div>

               </div>
          </div>
     )
}