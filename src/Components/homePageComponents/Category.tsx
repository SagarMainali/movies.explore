import { MovieAndShowsDetails } from "../../types/type"
import { useFetchDataFromApi } from "../../utils/api"
import { useRef, useState, useEffect } from "react"
import '../../styles/hide_scrollbar.css'
import { Card } from "../globalComponents/Card"
import { Controller } from "../globalComponents/Controller"
import { Skeleton } from "../globalComponents/Skeleton"

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

     const { data, isLoading } = useFetchDataFromApi(dynamicUrl)

     const containerRef = useRef<HTMLDivElement>(null)

     const [flexGap, setFlexGap] = useState<number>(0)

     function changeFlexGap() {
          if (window.screen.width >= 860) {
               setFlexGap(10)
          }
          else {
               setFlexGap(6)
          }
     }

     useEffect(() => {
          changeFlexGap()
          window.addEventListener('resize', changeFlexGap)
          return () => { window.removeEventListener('resize', changeFlexGap) }
     }, [])

     return (
          <div className="flex flex-col gap-3 relative">

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

               {/* when the Controller component renders it should pass the latest forwardedRef i.e after filling the container with movies or
               shows data, so in order to do that the Controller component is only rendered after the container gets filled with all data*/}
               {isLoading
                    ?
                    <Skeleton containerType="home-category" />
                    :
                    <div className="relative">

                         {/* gap-[${flexGap.toString()}px] - the dynamic assignment of flex gap was sometimes working sometime not, so used static instead*/}
                         <div className='hide-scrollbar flex md:gap-[10px] gap-[6px] overflow-x-scroll' ref={containerRef}>
                              {
                                   Array.isArray(data) && data.map((movieOrShow: MovieAndShowsDetails) => (
                                        <Card key={movieOrShow.id} customMediaType={userInput} containerType="home-category" {...movieOrShow} />
                                   ))
                              }
                         </div>

                         <Controller direction="left" forwardedRef={containerRef} gap={flexGap} />

                         <Controller direction="right" forwardedRef={containerRef} gap={flexGap} />

                    </div>
               }

          </div >
     )
}
