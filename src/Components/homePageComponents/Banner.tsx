import { GradientOverlay } from './GradientOverlay'
import { NavLink } from 'react-router-dom'
import { image_baseUrl } from '../../utils/common'
import { useState, useEffect } from 'react'
import { useFetchDataFromApi } from '../../utils/api'
import { MovieAndShowsDetails } from '../../types/type'
import { Loading } from '../helperComponents/Loading'

export function Banner() {

     const { data, isLoading } = useFetchDataFromApi('/trending/all/day')

     const [trending, setTrending] = useState<MovieAndShowsDetails>({} as MovieAndShowsDetails)

     useEffect(() => {
          if (data && Array.isArray(data)) {
               const randomNumber = Math.floor(Math.random() * 20)
               setTrending(data[randomNumber])
          }
     }, [isLoading])

     // useEffect(() => {
     //      useFetchDataFromApi('/trending/all/day')
     //           .then(response => {
     //                getSingleTrending(response)
     //           })

     //      // only set one object to 'trending' state out of 20 received from calling the api
     //      function getSingleTrending(trendingList: MovieAndShowsDetails[]) {
     //           const randomNumber = Math.floor(Math.random() * 20)
     //           setTrending(trendingList[randomNumber])
     //      }
     // }, [])

     return (
          isLoading && !data
               ?
               <Loading />
               :
               <NavLink to={`/${trending.media_type}/${trending.id}`}>
                    <div className={`md:h-[80vh] h-[95vh] max-h-[700px] bg-cover bg-no-repeat bg-center ${trending.backdrop_path ? 'object-cover' : 'object-contain'}`}
                         style={{ backgroundImage: trending.backdrop_path ? `url(${image_baseUrl + trending.backdrop_path})` : '/no-poster.png' }}>
                         <GradientOverlay>
                              <div className='flex flex-col gap-4 md:w-[70vw] w-full'>
                                   <h1 className='md:text-5xl sm:text-4xl text-3xl font-semibold'>{trending.title || trending.name}</h1>
                                   <div className='flex gap-3'>
                                        <h3 className='px-2 text-center uppercase text-[10px] font-bold bg-slate-300 text-primary-dark rounded-md'>{trending.media_type}</h3>
                                        <h3 className='px-2 text-center uppercase text-[10px] font-bold bg-slate-300 text-primary-dark rounded-md'>{trending.original_language}</h3>
                                        {
                                             trending.release_date && <h3 className='w-[75px] text-center uppercase text-[10px] font-bold bg-slate-300 text-primary-dark rounded-md'>{trending.release_date}</h3>
                                        }
                                        <h3 className='px-2 text-center uppercase text-[10px] font-bold bg-slate-300 text-primary-dark rounded-md flex gap-1 items-center'>
                                             {trending.vote_average?.toFixed(1)}
                                             <svg xmlns="http://www.w3.org/2000/svg" height="0.6rem" viewBox="0 0 576 512" fill='rgba(0, 28, 48, .8)'>
                                                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                             </svg>
                                        </h3>
                                   </div>
                                   <p>{trending.overview}</p>
                              </div>
                         </GradientOverlay>
                    </div>
               </NavLink>
     )
}