import { MovieAndShowsDetails } from "../../types/type"
import { useFetchDataFromApi } from "../../utils/api"
import { Card } from "../globalComponents/Card"
import '../../styles/hide_scrollbar.css'
import { useRef } from "react"

export function SuggestedCategory({ id, media_type, category }: { id: string | undefined, media_type: string | undefined, category: string }) {

     const endpoint = `/${media_type}/${id}/${category}`

     const { data } = useFetchDataFromApi(endpoint)

     const category_title = category === 'similar'
          ? `Similar ${media_type === 'movie'
               ? 'Movies' : 'Tv Shows'}`
          : 'Recommendations'

     const itemContainer = useRef<HTMLDivElement>(null)

     function slider(direction: string) {
          const container = itemContainer.current

          if (!container) {
               return // return early if the container is not available
          }

          const itemContainerWidth = container.offsetWidth
          const itemContainerScrollPosition = container.scrollLeft
          let pxToScroll = 0

          if (direction === 'right') {
               pxToScroll = itemContainerScrollPosition + itemContainerWidth
          }
          else {
               pxToScroll = itemContainerScrollPosition - itemContainerWidth
          }

          itemContainer.current?.scrollTo({
               left: pxToScroll,
               behavior: 'smooth'
          })
     }

     return (
          Array.isArray(data) && data.length > 0
          &&
          <div className="flex flex-col gap-3">
               <h1 className="sm:text-xl text-lg font-semibold">
                    {category_title}
               </h1>

               <div className="relative">

                    <svg className="h-[25px] absolute max-md:hidden top-[50%] left-2 -translate-y-[50%] z-10 
                              fill-primary-dark bg-slate-100 rounded-full cursor-pointer"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                         onClick={() => slider('left')}>
                         <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
                    </svg>

                    <svg className="h-[25px] absolute max-md:hidden top-[50%] right-2 -translate-y-[50%] z-10 
                              fill-primary-dark bg-slate-100 rounded-full cursor-pointer"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                         onClick={() => slider('right')}>
                         <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
                    </svg>

                    <div className="hide-scrollbar flex md:gap-[12px] gap-[8px] overflow-x-scroll" ref={itemContainer}>
                         {
                              data.map(
                                   (movieOrShow: MovieAndShowsDetails) => <Card key={movieOrShow.id} customMediaType={media_type} {...movieOrShow} />
                              )
                         }
                    </div>

               </div>

          </div>
     )
}
