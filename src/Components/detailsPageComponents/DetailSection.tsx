import { CircularProgressbar } from "react-circular-progressbar";
import { circularProgressbarStyles, image_baseUrl } from "../../utils/common";
import { MovieAndShowsDetails, VideoModeType, VideoType } from "../../types/type";
import { VideoPopup } from "./VideoPopup";
import { PlayButton } from "./PlayButton";
import { useEffect } from "react";
import { useGlobalContext } from "../../stateManagement/context";
import { LazyImage } from "../globalComponents/LazyImage";
import '../../styles/gradient_overlay.css'

export function DetailsSection({ movieOrShowData, media_type, trailer, videoMode, setVideoMode, changeVideoMode }: {
     movieOrShowData: MovieAndShowsDetails,
     media_type: string | undefined,
     trailer: VideoType,
     videoMode: VideoModeType,
     setVideoMode: React.Dispatch<React.SetStateAction<VideoModeType>>,
     changeVideoMode: (key?: string) => void
}) {

     const { changeDateFormat } = useGlobalContext()

     useEffect(() => {
          if (trailer) {
               setVideoMode({ openVideo: false, videoKey: trailer.key })
          }
     }, [trailer])

     // we only get minutes so this converts to proper format (79 = 1hr 19mins, 123 = 2hrs 3min) 
     function minutesConverter(minutes: number): string {
          let hr = 0, min = 0, hrOrHrs = '', minOrMins = ''
          if (minutes > 60) {
               hr = Math.floor(minutes / 60)
               min = minutes % 60
               // check if should be hr or hrs
               hrOrHrs = hr >= 10 ? 'hrs' : 'hr'
               // check if should be min or mins
               minOrMins = min >= 10 ? 'mins' : 'min'
               return `${hr + hrOrHrs} ${min + minOrMins}`
          }
          else {
               min = minutes
               // check if should be min or mins
               minOrMins = min >= 10 ? 'mins' : 'min'
               return `${min + minOrMins}`
          }
     }

     // we only get huge numbers so this converts to proper format (1000000 = 1 Million, 1250000 = 1.25 Million)
     function moneyInWords(money: number, type: string) {
          // to not add decimal in budget
          if (type === 'budget') {
               if (money < 1000000) {
                    return `${(money / 1000).toFixed()} Thousand`
               }
               else if (money >= 1000000 && money < 1000000000) {
                    return `${(money / 1000000).toFixed()} Million`
               }
               else {
                    return `${(money / 1000000000).toFixed()} Billion`
               }
          }
          // to add decimal in revenue
          else {
               if (money < 1000000) {
                    return `${(money / 1000).toFixed(2)} Thousand`
               }
               else if (money >= 1000000 && money < 1000000000) {
                    return `${(money / 1000000).toFixed(2)} Million`
               }
               else {
                    return `${(money / 1000000000).toFixed(2)} Billion`
               }
          }
     }

     return (
          <div className="md:h-[95vh] md:relative max-h-[700px]">

               {/* <div
                    className="bg-no-repeat bg-cover bg-top md:h-[80%] h-[50vh] w-full relative"
                    style={{ backgroundImage: `url(${ image_baseUrl + movieOrShowData.backdrop_path})` }}>
                    <div className="overlay-lrb h-full w-full absolute inset-0"></div>
               </div> */}

               <div className="md:h-[80%] h-[35vh]">
                    {/* separate container because to make the overlaying div positioned absolute relative to this container because class
                     relative doesn't work in img*/}
                    <div className="md:h-full w-full h-[65vh] relative -z-10">
                         <LazyImage
                              src={movieOrShowData.backdrop_path ? image_baseUrl + movieOrShowData.backdrop_path : '/no-poster.png'}
                              alt="backdrop_img"
                              className={`h-full w-full object-center ${movieOrShowData.backdrop_path ? 'object-cover' : 'object-contain'}`}
                         />
                         <div className="overlay-lrb absolute inset-0 top-0"></div>
                    </div>
               </div>

               <div className="md:absolute md:bottom-0 flex justify-center w-full">
                    <div className="lg:w-[90%] w-[100%] flex gap-3">
                         <img
                              src={movieOrShowData.poster_path ? `${image_baseUrl}/${movieOrShowData.poster_path}` : '/no-poster.png'}
                              alt="posterImg"
                              className='rounded-lg max-h-[370px] md:block hidden' />

                         <div className="flex flex-col md:gap-4 gap-2">
                              <div className="flex flex-col gap-1 items-start">
                                   <h1
                                        className="font-bold text-3xl text-slate-200 bg-primary-dark/40 py-[2px] px-2 rounded-lg">
                                        {movieOrShowData.title || movieOrShowData.name}
                                   </h1>
                                   {movieOrShowData.tagline &&
                                        <h1
                                             className="font-medium text-[12px] italic text-slate-200 bg-primary-dark/40 py-[2px] px-2 rounded-lg">
                                             {movieOrShowData.tagline}
                                        </h1>}
                              </div>
                              <div className="flex gap-2 items-center">
                                   {
                                        movieOrShowData.genres.map((genre: { name: string, id: number }) => (
                                             <span key={genre.id} className="bg-slate-200 rounded-md px-[6px] py-[2px] text-primary-dark text-[10px] font-bold">
                                                  {genre.name}
                                             </span>))
                                   }
                              </div>
                              <div className="flex gap-2 ites-center">
                                   <span className="h-[50px] w-[50px]">
                                        <CircularProgressbar
                                             maxValue={10} value={movieOrShowData.vote_average} text={`${movieOrShowData.vote_average?.toFixed(1)} `}
                                             strokeWidth={9} background
                                             styles={{
                                                  ...circularProgressbarStyles, path: {
                                                       stroke: movieOrShowData.vote_average >= 6.5 ? '#0FB6DF' : '#f07b41'
                                                  }
                                             }} />
                                   </span>
                                   <div className='group rounded-full relative h-[50px] w-[50px]' onClick={() => changeVideoMode(trailer.key)}>
                                        <PlayButton />
                                   </div>
                                   {/* no matter where it gets triggered from, but it always opens here but since it has its position fixed,
                                   there is no problem in doing so*/}
                                   {videoMode.openVideo && <VideoPopup
                                        videoKey={videoMode.videoKey}
                                        changeVideoMode={changeVideoMode}
                                        title={movieOrShowData.title || movieOrShowData.name} />
                                   }
                              </div>
                              <div className="flex gap-2">
                                   <span className="bg-slate-200 rounded-md px-[6px] py-[2px] text-primary-dark text-[10px] font-bold">{media_type?.toUpperCase()}</span>
                                   <span className="bg-slate-200 rounded-md px-[6px] py-[2px] text-primary-dark text-[10px] font-bold">{movieOrShowData.original_language?.toUpperCase()}</span>
                              </div>
                              {
                                   media_type === 'movie'
                                        ?
                                        <div className="flex md:gap-4 gap-2 text-sm flex-wrap">
                                             <h4 className='font-semibold'>Released on: <span className="text-slate-300 font-normal">{changeDateFormat(movieOrShowData.release_date)}</span></h4>
                                             <h4 className='font-semibold'>Status: <span className="text-slate-300 font-normal">{movieOrShowData.status}</span></h4>
                                             <h4 className='font-semibold'>Running Time: <span className="text-slate-300 font-normal">{minutesConverter(movieOrShowData.runtime)}</span></h4>
                                        </div>
                                        :
                                        <div className="flex md:gap-4 gap-2 text-sm flex-wrap">
                                             <h4 className='font-semibold'>First aired on: <span className="text-slate-300 font-normal">{changeDateFormat(movieOrShowData.first_air_date)}</span></h4>
                                             <h4 className='font-semibold'>Last aired on: <span className="text-slate-300 font-normal">{changeDateFormat(movieOrShowData.last_air_date)}</span></h4>
                                             <h4 className='font-semibold'>Status: <span className="text-slate-300 font-normal">{movieOrShowData.status}</span></h4>
                                             <h4 className='font-semibold'>No of Episodes: <span className="text-slate-300 font-normal">{movieOrShowData.number_of_seasons}</span></h4>
                                             <h4 className='font-semibold'>No of Seasons: <span className="text-slate-300 font-normal">{movieOrShowData.number_of_episodes}</span></h4>
                                        </div>
                              }
                              {media_type === 'movie' &&
                                   <div className="flex gap-4 text-sm">
                                        <h4 className='font-semibold'>Budget: <span className="text-slate-300 font-normal">{movieOrShowData.budget ? moneyInWords(movieOrShowData.budget, 'budget') : 'N/A'}</span></h4>
                                        <h4 className='font-semibold'>Box office: <span className="text-slate-300 font-normal">{movieOrShowData.revenue ? moneyInWords(movieOrShowData.revenue, 'revenue') : 'N/A'}</span></h4>
                                   </div>
                              }
                              <p className="text-slate-300 md:text-[15px] text-sm">"{movieOrShowData.overview}"</p>
                         </div>
                    </div>
               </div>
          </div>
     )
}
