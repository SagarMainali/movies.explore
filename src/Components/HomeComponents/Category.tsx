import { MovieAndShowsDetails } from "../../types/type"
import { fetchDataFromApi } from "../../utils/api"
import { useState } from "react"
import { image_baseUrl } from "../../utils/api"
import { NavLink } from "react-router-dom"

export function Category({ category }: { category: string }) {

     // movies or tvshow
     const [userInput, setuserInput] = useState<string>('tv')

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


     const { data, isLoading } = fetchDataFromApi(dynamicUrl)

     console.log(data)

     return (
          <div className="flex flex-col gap-2">
               <div className="flex justify-between">
                    <h2 className="text-2xl">{category}</h2>

               </div>
               <div className="flex gap-3">
                    {
                         data?.map(
                              (movieOrShow: MovieAndShowsDetails) => (
                                   <NavLink key={movieOrShow.id} to={`/watch/${movieOrShow.id}`}>
                                        <img className="md:min-w-[200px] min-w-[150px]" src={`${image_baseUrl}/${movieOrShow.poster_path}`} alt="movie/tvshow" />
                                   </NavLink>
                              )
                         )
                    }
               </div>

          </div>
     )
}
