import { MovieAndShowsDetails } from "../../types/type"
import { fetchDataFromApi } from "../../utils/api"
import { useState } from "react"
import { image_baseUrl } from "../../utils/api"
import { NavLink } from "react-router-dom"
import '../../styles/category.css'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export function Category({ category }: { category: string }) {

     // movies or tvshow
     const [userInput, setUserInput] = useState<string>('movie')

     const changeUserInput = (category: string) => {
          setUserInput(category === 'movie' ? 'movie' : 'tv')
     }

     let dynamicUrl = (
          category === 'Trending Now'
               ? `/trending/${userInput}/day`
               : category === "What's Popular"
                    ? `/${userInput}/popular`
                    : category === 'Top rated'
                         ? `/${userInput}/top_rated`
                         : category === 'Now playing'
                              ? `/${userInput}/${userInput === 'movie' ? 'now_playing' : 'on_the_air'}`
                              : ''

     )


     const { data } = fetchDataFromApi(dynamicUrl)

     const circularProgressbarStyles = {
          text: {
               fontSize: '32px',
               fontWeight: 'bolder',
               fill: '#001C30'
          },
          trail: {
               stroke: 'rgb(226 232 240)'
          },
          background: {
               fill: 'rgb(226 232 240)'
          }
     }

     return (
          <div className="flex flex-col gap-3">

               <div className="flex justify-between items-center">
                    <h2 className="sm:text-2xl text-lg font-semibold">{category}</h2>
                    <span className="flex rounded-md text-xs sm:text-sm text-slate-200 bg-slate-500 z-0 sm:w-[170px] w-[140px] overflow-hidden">
                         <h4
                              onClick={() => { changeUserInput('movie') }}
                              className={`py-0.5 text-center cursor-pointer rounded-md w-[50%] relative 
                              after:absolute after:inset-0 after:bg-slate-700 after:-z-10 after:rounded-md after:duration-200
                              ${userInput === 'movie' ? '' : 'after:translate-x-[100%]'}`}>Movies</h4>
                         <h4
                              onClick={() => { changeUserInput('tv') }}
                              className='py-0.5 text-center cursor-pointer rounded-md w-[50%]'>Tv Shows</h4>
                    </span>
               </div>

               <div className="category flex gap-3 overflow-x-scroll">
                    {
                         data?.map(
                              (movieOrShow: MovieAndShowsDetails) => (
                                   <div key={movieOrShow.id} className="flex flex-col gap-1">
                                        <div className="relative">
                                             <NavLink to={`/details/${movieOrShow.id}`}>
                                                  <img
                                                       className="md:min-w-[200px] sm:min-w-[150px] min-w-[120px] rounded-lg"
                                                       src={`${image_baseUrl}/${movieOrShow.poster_path}`} alt="movie/tvshow" />
                                             </NavLink>
                                             <span className="absolute left-1 bottom-1 w-[40px] h-[40px] rounded-full p-[1.5px] bg-slate-200">
                                                  <CircularProgressbar
                                                       maxValue={10} value={movieOrShow.vote_average} text={`${movieOrShow.vote_average.toFixed(1)}`}
                                                       strokeWidth={9} background
                                                       styles={{
                                                            ...circularProgressbarStyles, path: {
                                                                 stroke: movieOrShow.vote_average >= 6.5 ? '#0FB6DF' : '#f07b41'
                                                            }
                                                       }} />
                                             </span>
                                        </div>
                                        <h1 className="sm:text-lg text-sm truncate md:max-w-[195px] sm:max-w-[145px] max-w-[115px]">
                                             {(movieOrShow.title || movieOrShow.name).length > 50
                                                  ? ((movieOrShow.title || movieOrShow.name).slice(0, 50) + '...')
                                                  : (movieOrShow.title || movieOrShow.name)
                                             }
                                        </h1>
                                        <h2 className="text-[10px] font-bold">{movieOrShow.release_date}</h2>
                                   </div>
                              )
                         )
                    }
               </div>

          </div>
     )
}
