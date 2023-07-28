import { MovieAndShowsDetails } from "../../types/type"
import { fetchDataFromApi } from "../../utils/api"
import { useState } from "react"
import { image_baseUrl } from "../../utils/api"
import { NavLink } from "react-router-dom"
import '../../styles/category.css'

export function Category({ category }: { category: string }) {

     // movies or tvshow
     const [userInput, setUserInput] = useState<string>('movie')

     const changeUserInput = () => {
          setUserInput((prevInput: string) => (
               prevInput === 'movie' ? 'tv' : 'movie')
          )
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
          <div className="flex flex-col gap-2">
               <div className="flex justify-between items-center">
                    <h2 className="text-2xl">{category}</h2>
                    <span className="flex rounded-md text-sm">
                         <h4 onClick={changeUserInput} className={`py-0.5 px-3 cursor-pointer rounded-md ${userInput === 'movie' ? 'bg-slate-700': ''}`}>Movies</h4>
                         <h4 onClick={changeUserInput} className={`py-0.5 px-3 cursor-pointer rounded-md ${userInput === 'tv' ? 'bg-slate-700': ''}`}>Tv Shows</h4>
                    </span>
               </div>
               <div className="category flex gap-3 overflow-x-scroll">
                    {
                         data?.map(
                              (movieOrShow: MovieAndShowsDetails) => (
                                   <NavLink key={movieOrShow.id} to={`/details/${movieOrShow.id}`}>
                                        <img className="lg:min-w-[250px] md:min-w-[200px] sm:min-w-[150px] min-w-[120px] rounded-md" src={`${image_baseUrl}/${movieOrShow.poster_path}`} alt="movie/tvshow" />
                                   </NavLink>
                              )
                         )
                    }
               </div>

          </div>
     )
}
