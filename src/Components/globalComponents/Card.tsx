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
     // 2xl:h-[300px] xl:min-h-[410px] lg:min-h-[460px] md:min-h-[415px] sm:min-h-[300px] xsm:min-h-[400px] min-h-[345px]
     // ${pathname.includes('movies') || pathname.includes('tvshows') || pathname.includes('search') ? 'max-h-[400px]' : 'max-h-[300px]'}`
     return (
          <div className="flex flex-col gap-1">
               <div className="relative">
                    <NavLink to={`/${customMediaType}/${id}`}>
                         <img
                              className={` rounded-lg
                              ${pathname === '/' || pathname === `/${media_type}/${main_id}`
                                        ? 'md:min-w-[200px] sm:min-w-[150px] min-w-[130px] md:h-[300px] sm:h-[230px] h-[190px]'
                                        : 'max-h-[350px] '}`
                              }
                              src={poster_path ? `${image_baseUrl}/${poster_path}` : '/no-poster.png'}
                              alt="movie/tvshow"
                         />
                    </NavLink>
                    <span className="absolute left-1 bottom-1 w-[40px] h-[40px] rounded-full p-[1.5px] bg-slate-200">
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
               <h1 className="sm:text-lg text-sm truncate md:max-w-[195px] sm:max-w-[145px] max-w-[115px]">{title || name}</h1>
               <h2 className="text-[10px] font-bold">{
                    release_date
                         ? changeDateFormat(release_date)
                         : first_air_date ?
                              changeDateFormat(first_air_date)
                              : 'N/A'}
               </h2>
          </div>
     )
}
