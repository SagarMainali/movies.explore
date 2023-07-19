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
                                                  {
                                                       trending.release_date && <h3 className='w-[75px] text-center uppercase text-[10px] font-bold bg-slate-300 text-primary-dark rounded-md'>{trending.release_date}</h3>
                                                  }
                                                  <h3 className='px-2 text-center uppercase text-[10px] font-bold bg-slate-300 text-primary-dark rounded-md flex gap-1 items-center'>
                                                       {trending.vote_average.toFixed(1)}
                                                       <svg xmlns="http://www.w3.org/2000/svg" height="0.6rem" viewBox="0 0 576 512" fill='rgba(0, 28, 48, .8)'>
                                                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                                       </svg>
                                                  </h3>
                                             </div>
                                             <p>{trending.overview}</p>
                                        </div>
                                   </GradientOverlay>
                              </div>
                              :
                              // show plane background before getting data from api
                              <div className="h-[90vh] max-h-[700px] bg-primary-dark"></div>
                    }


               </NavLink>
          </header >
     )
}