import { GradientOverlay } from './GradientOverlay'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchDataFromApi } from '../../utils/api'
import { MovieAndShowsDetails } from '../../types/type'

export function Banner() {

     const [trending, setTrending] = useState<MovieAndShowsDetails>()

     useEffect(() => {
          fetchDataFromApi('/trending/all/day')
               .then(response => {
                    getSingleTrending(response)
               })

          // only set one object to 'trending' state out of 20 received from calling the api
          function getSingleTrending(trendingList: MovieAndShowsDetails[]) {
               const randomNumber = Math.floor(Math.random() * 20)
               setTrending(trendingList[randomNumber])
          }
     }, [])

     return (
          <header>
               <NavLink to='/movies/123'>
                    {/* {
                         trending
                              ? <div className="h-[90vh] max-h-[700px] bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${trending?.backdrop_path})` }}>
                                   <GradientOverlay />
                              </div>
                              : <Loading />
                    } */}
                    <div className="h-[90vh] max-h-[700px] bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${trending?.backdrop_path})` }}>
                         <GradientOverlay />
                    </div>
               </NavLink>
          </header >
     )
}