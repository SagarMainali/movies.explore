import { image_baseUrl } from "../../utils/common"
import { NavLink, useLocation, useParams } from "react-router-dom"
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { MovieAndShowsDetails } from "../../types/type"
import { circularProgressbarStyles } from "../../utils/common"
import { useGlobalContext } from "../../stateManagement/context"

// the customMediaType is needed because only trending movies or shows has media_type property
export function Card({ customMediaType, ...movieOrShow }: { customMediaType: string | undefined } & MovieAndShowsDetails) {

     const { id, poster_path, vote_average, title, name, release_date, first_air_date } = movieOrShow

     const { pathname } = useLocation()

     const { media_type, id: main_id } = useParams()

     const { changeDateFormat } = useGlobalContext()

     return (
          <div className={`flex flex-col gap-1 
               ${pathname === '/' || pathname === `/${media_type}/${main_id}`
                    ? `xl:min-w-[calc((100%/7)-10.3px)]
                         lg:min-w-[calc((100%/6)-10.3px)] 
                         md:min-w-[calc((100%/5)-10.3px)] 
                         sm:min-w-[calc((100%/4)-6px)]
                         min-w-[calc((100%/3)-5px)]`
                    : ''} `}>
               <div className="relative">
                    <NavLink to={`/${customMediaType}/${id}`}>
                         <img
                              className={` rounded-xl
                              ${pathname === '/'
                                        ? 'w-[100%] xl:h-[280px] lg:h-[270px] md:h-[270px] sm:h-[260px] xsm:h-[250px] xxsm:h-[170px] h-[145px]'
                                        : pathname === `/${media_type}/${main_id}`
                                             ? 'w-[100%] xl:h-[255px] lg:h-[240px] md:h-[265px] sm:h-[260px] xsm:h-[250px] xxsm:h-[170px] h-[145px]'
                                             : 'lg:h-[350px] md:h-[280px] sm:h-[260px] xsm:h-[280px] h-[300px]'}`
                              }
                              src={poster_path ? `${image_baseUrl}/${poster_path}` : '/no-poster.png'}
                              alt="movie/tvshow"
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
               <div className="flex flex-col gap-0">
                    <h1 className="sm:text-lg text-sm truncate md:max-w-[195px] sm:max-w-[145px] max-w-[115px]">{title || name}</h1>
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
