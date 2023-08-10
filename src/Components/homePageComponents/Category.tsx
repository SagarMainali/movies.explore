import { MovieAndShowsDetails } from "../../types/type"
import { useFetchDataFromApi } from "../../utils/api"
import { useState } from "react"
import '../../styles/hide_scrollbar.css'
import { Card } from "../globalComponents/Card"
// import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function Category({ category }: { category: string }) {

     // movies or tvshow
     const [userInput, setUserInput] = useState<string>('movie')

     const changeUserInput = (category: string) => {
          setUserInput(category === 'movie' ? 'movie' : 'tv')
     }

     let dynamicUrl = (
          category === 'Trending Now'
               ? `/trending/${userInput}/week`
               : category === "What's Popular"
                    ? `/${userInput}/popular`
                    : category === 'Top rated'
                         ? `/${userInput}/top_rated`
                         : category === 'Now playing'
                              ? `/${userInput}/${userInput === 'movie' ? 'now_playing' : 'on_the_air'}`
                              : ''

     )

     const { data } = useFetchDataFromApi(dynamicUrl)

     return (
          <div className="flex flex-col gap-3">

               <div className="flex justify-between items-center">
                    <h2 className="md:text-2xl text-lg font-semibold">{category}</h2>
                    <span className="flex rounded-md text-xs sm:text-sm text-slate-200 bg-slate-700 z-0 sm:w-[170px] w-[140px] overflow-hidden">
                         <h4
                              onClick={() => { changeUserInput('movie') }}
                              className={`py-0.5 text-center cursor-pointer rounded-md w-[50%] relative 
                              after:absolute after:inset-0 after:bg-slate-500 after:-z-10 after:rounded-md after:duration-200
                              ${userInput === 'movie' ? '' : 'after:translate-x-[100%]'}`}>Movies</h4>
                         <h4
                              onClick={() => { changeUserInput('tv') }}
                              className='py-0.5 text-center cursor-pointer rounded-md w-[50%]'>Tv Shows</h4>
                    </span>
               </div>

               <div className="hide-scrollbar flex md:gap-[12px] gap-[8px] overflow-x-scroll relative">

                    <svg className="h-[24px] absolute max-md:hidden top-[50%] left-1 -translate-y-[50%] z-10 
                    fill-primary-dark bg-slate-100 rounded-full cursor-pointer"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                         <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
                    </svg>

                    <svg className="h-[24px] absolute max-md:hidden top-[50%] right-1 -translate-y-[50%] z-10 
                    fill-primary-dark bg-slate-100 rounded-full cursor-pointer"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                         <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
                    </svg>

                    {
                         Array.isArray(data) && data?.map((movieOrShow: MovieAndShowsDetails) => <Card key={movieOrShow.id} customMediaType={userInput} {...movieOrShow} />)
                    }
               </div>

          </div>
     )
}
