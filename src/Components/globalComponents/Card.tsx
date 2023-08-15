import { image_baseUrl } from "../../utils/common"
import { NavLink } from "react-router-dom"
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { MovieAndShowsDetails } from "../../types/type"
import { circularProgressbarStyles } from "../../utils/common"
import { useGlobalContext } from "../../stateManagement/context"
import { LazyImage } from "./LazyImage"

// the customMediaType is needed because only trending movies or shows has media_type property
export function Card({ customMediaType, containerType, ...movieOrShow }: {
     customMediaType: string | undefined, containerType?: string
} & MovieAndShowsDetails) {

     const { id, poster_path, vote_average, title, name, release_date, first_air_date } = movieOrShow

     const { changeDateFormat } = useGlobalContext()

     return (
          <div className={`flex flex-col gap-1 p-[3px] border-2 border-opacity-1 rounded-xl
               ${containerType === 'home-category' || containerType === 'suggested-category'
                    ? `xl:min-w-[calc((100%/7)-10px+calc(10px/7))]
                         lg:min-w-[calc((100%/6)-10px+calc(10px/6))] 
                         md:min-w-[calc((100%/5)-10px+calc(10px/5))] 
                         sm:min-w-[calc((100%/4)-6px+calc(6px/4))]
                         min-w-[calc((100%/3)-6px+calc(6px/3))]
                         ${vote_average >= 6.5 ? 'border-[#0FB6DF]' : 'border-[#f07b41]'}`
                    : ''} `}>
               {/* above width explained - 
               the first calc divides the width according to the no of total items in the container,
               the '-10px' is reduced from the total width because to give space for flex gap,
               the last calc further refines the width to share the gap of last item in the visible container
               with this configuration, each item in the container gets equal width with proper gap in the middle*/}
               <div className="relative">
                    <NavLink to={`/${customMediaType}/${id}`}>
                         <LazyImage
                              src={poster_path ? `${image_baseUrl}/${poster_path}` : '/no-poster.png'}
                              alt="movie/tvshow"
                              className={`rounded-lg overflow-hidden
                              ${containerType === 'home-category'
                                        ? 'w-[100%] xl:h-[280px] lg:h-[270px] md:h-[270px] sm:h-[260px] xsm:h-[250px] xxsm:h-[170px] h-[145px]'
                                        : containerType === 'suggested-category'
                                             ? 'w-[100%] xl:h-[255px] lg:h-[240px] md:h-[265px] sm:h-[260px] xsm:h-[250px] xxsm:h-[170px] h-[145px]'
                                             : 'lg:h-[350px] md:h-[280px] sm:h-[260px] xsm:h-[280px] h-[300px]'}`}
                         />
                    </NavLink>
                    <span className="absolute left-1 bottom-1 sm:w-[40px] sm:h-[40px] w-[32px] h-[32px] rounded-full p-[1.5px] bg-slate-200">
                         <CircularProgressbar
                              maxValue={10} value={vote_average} text={`${vote_average?.toFixed(1)}`}
                              strokeWidth={9} background
                              styles={{
                                   ...circularProgressbarStyles, path: {
                                        stroke: vote_average >= 6.5 ? '#0FB6DF' : '#f07b41'
                                   }
                              }} />
                    </span>
               </div>
               <div className="flex flex-col gap-0 w-[100%] overflow-hidden">
                    <h1 className="sm:text-lg text-sm truncate">{title || name}</h1>
                    <h2 className="text-[10px] font-bold">{
                         release_date
                              ? changeDateFormat(release_date)
                              : first_air_date ?
                                   changeDateFormat(first_air_date)
                                   : 'N/A'}
                    </h2>
               </div>
          </div>
     )
}
