import { MovieAndShowsDetails } from "../../types/type"
import { fetchDataFromApi } from "../../utils/api"
import { useState } from "react"
import { image_baseUrl } from "../../utils/api"
import { NavLink } from "react-router-dom"
import '../../styles/category.css'

export function Category({ category }: { category: string }) {

     // movies or tvshow
     const [userInput, setUserInput] = useState<string>('movie')

     const changeUserInput = (category: string) => {
          setUserInput(category === 'movie' ? 'movie' : 'tv')
     }

     let dynamicUrl = (
          category === 'Trending'
               ? `/trending/${userInput}/week`
               : category === 'Popular'
                    ? `/${userInput}/popular`
                    : category === 'Top rated'
                         ? `/${userInput}/top_rated`
                         : category === 'Now playing'
                              ? `/${userInput}/${userInput === 'movie' ? 'now_playing' : 'on_the_air'}`
                              : ''

     )


     const { data } = fetchDataFromApi(dynamicUrl)

     return (
          <div className="flex flex-col gap-3">

               <div className="flex justify-between items-center">
                    <h2 className="text-2xl">{category}</h2>
                    <span className="flex rounded-md text-sm text-slate-200 bg-slate-500 z-0 sm:w-[170px] w-[140px] overflow-hidden">
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
                                   <NavLink key={movieOrShow.id} to={`/details/${movieOrShow.id}`}>
                                        <img
                                             className="md:min-w-[200px] sm:min-w-[150px] min-w-[120px] rounded-lg"
                                             src={`${image_baseUrl}/${movieOrShow.poster_path}`} alt="movie/tvshow" />
                                   </NavLink>
                              )
                         )
                    }
               </div>

          </div>
     )
}
