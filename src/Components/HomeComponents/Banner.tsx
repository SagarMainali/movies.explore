import { GradientOverlay } from './GradientOverlay'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchDataFromApi } from '../../utils/api'

export function Banner() {

     const [trending, setTrending] = useState([])

     useEffect(() => {
          fetchDataFromApi('/trending/all/day')
               .then(res => {
                    console.log(res)
               })
     }, [])

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