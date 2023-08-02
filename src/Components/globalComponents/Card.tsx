import { image_baseUrl } from "../../utils/common"
import { NavLink } from "react-router-dom"
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { MovieAndShowsDetails } from "../../types/type"
import { circularProgressbarStyles } from "../../utils/common"

export function Card({ customMediaType, ...movieOrShow }: { customMediaType: string | undefined } & MovieAndShowsDetails) {

     const { id, poster_path, vote_average, title, name, release_date } = movieOrShow

     return (
          <div className="flex flex-col gap-1">
               <div className="relative">
                    <NavLink to={`/${customMediaType}/${id}`}>
                         <img
                              className='md:min-w-[200px] sm:min-w-[150px] min-w-[120px] rounded-lg h-[300px]'
                              src={`${image_baseUrl}/${poster_path}`} alt="movie/tvshow" />
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
               <h2 className="text-[10px] font-bold">{release_date}</h2>
          </div>
     )
}
