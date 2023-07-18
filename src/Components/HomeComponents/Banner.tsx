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
               <NavLink to={`/movies/${trending?.id}`}>

                    {
                         trending
                              ?
                              <div className="h-[90vh] max-h-[700px] bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${trending.backdrop_path})` }}>
                                   <GradientOverlay>
                                        <div className='flex flex-col gap-4'>
                                             <h1 className='text-5xl font-semibold'>{trending.title || trending.name}</h1>
                                             <div className='flex gap-3'>
                                                  <h3 className='px-2 text-center uppercase text-[10px] font-bold bg-slate-300 text-primary-dark rounded-md'>{trending.media_type}</h3>
                                                  <h3 className='px-2 text-center uppercase text-[10px] font-bold bg-slate-300 text-primary-dark rounded-md'>{trending.original_language}</h3>
                                                  <h3 className='px-2 text-center uppercase text-[10px] font-bold bg-slate-300 text-primary-dark rounded-md'>{trending.vote_average.toFixed(1)}</h3>
                                                  {
                                                       trending.release_date && <h3 className='w-[75px] text-center uppercase text-[10px] font-bold bg-slate-300 text-primary-dark rounded-md'>{trending.release_date}</h3>
                                                  }
                                             </div>
                                             <p>{trending.overview}</p>
                                        </div>
                                   </GradientOverlay>
                              </div>
                              :
                              <div className="h-[90vh] max-h-[700px] bg-primary-dark"></div>
                    }


               </NavLink>
          </header >
     )
}