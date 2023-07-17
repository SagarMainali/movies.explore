import { NavLink } from "react-router-dom"

export function Navbar() {
     // max-2xl:w-[calc(100%-24px)]
     return (
          <div className="fixed w-full max-w-[1500px] z-10 py-2 px-3 bg-primary-dark/40">
               {/* Logo */}
               <div className="flex justify-between items-center">
                    <NavLink to='/' className="relative h-[20px] md:w-[140px] w-[100px]">
                         <img src={'/tmdb-logo.svg'} alt="tmbd-logo" />
                    </NavLink>

                    {/* Search */}
                    <div className="rounded-3xl md:w-[20rem] sm:w-[16rem] w-[12rem] overflow-hidden flex items-center">
                         <input type="text" placeholder="Search..." className="w-[87%] md:h-[34px] h-[30px] bg-slate-300 text-slate-900 font-medium caret-slate-900 outline-0 px-4 placeholder:text-slate-900 placeholder:text-sm" />
                         <button className="w-[13%] md:h-[34px] h-[30px] bg-primary-dark/40" onClick={() => console.log('clicked')}>
                              <svg className="w-full md:h-[1.2rem] h-[1rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#0FB6DF">
                                   <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                              </svg>
                         </button>
                    </div>

                    {/* Routes */}
                    <ul className="flex md:gap-6 gap-3 items-center">
                         <NavLink to='/movies'>Movies</NavLink>
                         <NavLink to='/tvshows'>TV Shows</NavLink>
                    </ul>
               </div>
          </div>
     )
}