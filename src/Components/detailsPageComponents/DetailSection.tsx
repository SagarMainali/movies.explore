import { CircularProgressbar } from "react-circular-progressbar";
import { circularProgressbarStyles, image_baseUrl } from "../../utils/common";
import { MovieAndShowsDetails, VideoModeType, VideoType } from "../../types/type";
import { VideoPopup } from "./VideoPopup";
import { PlayButton } from "./PlayButton";
import { useEffect } from "react";

export function DetailsSection({ movieOrShowData, media_type, trailer, videoMode, setVideoMode, changeVideoMode }: {
     movieOrShowData: MovieAndShowsDetails,
     media_type: string | undefined,
     trailer: VideoType,
     videoMode: VideoModeType,
     setVideoMode: React.Dispatch<React.SetStateAction<VideoModeType>>,
     changeVideoMode: (key?: string) => void
}) {

     useEffect(() => {
          if (trailer) {
               setVideoMode({ openVideo: false, videoKey: trailer.key })
          }
     }, [trailer])

     return (
          <div className="h-[85vh] relative">

               <div
                    className="bg-no-repeat bg-cover bg-top h-[80%] w-full relative"
                    style={{ backgroundImage: `url(${image_baseUrl + movieOrShowData.backdrop_path})` }}>
                    <div className="overlay-lrb h-full w-full absolute inset-0"></div>
               </div>

               <div className="absolute bottom-0 w-full flex justify-center">
                    <div className="lg:w-[85%] w-[100%] flex gap-3">
                         <img src={image_baseUrl + movieOrShowData.poster_path} alt="posterImg" className='rounded-lg max-h-[370px]' />
                         <div className="flex flex-col gap-4">
                              <div className="flex flex-col gap-1 items-start">
                                   <h1 className="font-bold text-3xl text-slate-200 bg-primary-dark/40 py-[2px] px-3 rounded-lg">{movieOrShowData.title || movieOrShowData.name}</h1>
                                   {movieOrShowData.tagline && <h1 className="font-medium text-[12px] italic text-slate-200 bg-primary-dark/40 py-[2px] px-2 rounded-lg">{movieOrShowData.tagline}</h1>}
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
                                             maxValue={10} value={movieOrShowData.vote_average} text={`${movieOrShowData.vote_average?.toFixed(1)}`}
                                             strokeWidth={9} background
                                             styles={{
                                                  ...circularProgressbarStyles, path: {
                                                       stroke: movieOrShowData.vote_average >= 6.5 ? '#0FB6DF' : '#f07b41'
                                                  }
                                             }} />
                                   </span>
                                   <span className='group rounded-full' onClick={() => changeVideoMode(trailer.key)}>
                                        <PlayButton />
                                   </span>
                                   {videoMode.openVideo && <VideoPopup
                                        videoKey={videoMode.videoKey}
                                        changeVideoMode={changeVideoMode}
                                        title={movieOrShowData.title || movieOrShowData.name} />}
                              </div>
                              <div className="flex gap-2">
                                   <span className="bg-slate-200 rounded-md px-[6px] py-[2px] text-primary-dark text-[10px] font-bold">{media_type?.toUpperCase()}</span>
                                   <span className="bg-slate-200 rounded-md px-[6px] py-[2px] text-primary-dark text-[10px] font-bold">{movieOrShowData.original_language?.toUpperCase()}</span>
                              </div>
                              {
                                   media_type === 'movie'
                                        ?
                                        <div className="flex gap-4 text-sm flex-wrap">
                                             <h4 className='font-semibold'>Released on: <span className="text-slate-300 font-normal">{movieOrShowData.release_date || movieOrShowData.first_air_date}</span></h4>
                                             <h4 className='font-semibold'>Status: <span className="text-slate-300 font-normal">{movieOrShowData.status}</span></h4>
                                             <h4 className='font-semibold'>Running Time: <span className="text-slate-300 font-normal">{movieOrShowData.runtime} minutes</span></h4>
                                        </div>
                                        :
                                        <div className="flex gap-4 text-sm flex-wrap">
                                             <h4 className='font-semibold'>First aired on: <span className="text-slate-300 font-normal">{movieOrShowData.first_air_date}</span></h4>
                                             <h4 className='font-semibold'>Last aired on: <span className="text-slate-300 font-normal">{movieOrShowData.last_air_date}</span></h4>
                                             <h4 className='font-semibold'>Status: <span className="text-slate-300 font-normal">{movieOrShowData.status}</span></h4>
                                             <h4 className='font-semibold'>No of Episodes: <span className="text-slate-300 font-normal">{movieOrShowData.number_of_seasons}</span></h4>
                                             <h4 className='font-semibold'>No of Seasons: <span className="text-slate-300 font-normal">{movieOrShowData.number_of_episodes}</span></h4>
                                        </div>
                              }
                              {media_type === 'movie' &&
                                   <div className="flex gap-4 text-sm">
                                        <h4 className='font-semibold'>Budget: <span className="text-slate-300 font-normal">{movieOrShowData.budget ? movieOrShowData.budget : 'N/A'}</span></h4>
                                        <h4 className='font-semibold'>Box office: <span className="text-slate-300 font-normal">{movieOrShowData.revenue ? movieOrShowData.budget : 'N/A'}</span></h4>
                                   </div>
                              }
                              <p className="text-slate-300 text-[15px]">"{movieOrShowData.overview}"</p>
                         </div>
                    </div>
               </div>
          </div>
     )
}
