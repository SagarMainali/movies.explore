import { VideoModeType, VideoType } from "../../types/type"
import { Controller } from "../globalComponents/Controller"
import { LazyImage } from "../globalComponents/LazyImage"
import { PlayButton } from "./PlayButton"
import { useRef } from 'react'

export default function VideosSection({ videosData, changeVideoMode }: {
     videosData: VideoType[],
     videoMode: VideoModeType,
     changeVideoMode: (key?: string) => void
}) {

     const containerRef = useRef<HTMLDivElement>(null)

     return (
          videosData && videosData.length > 0
          &&
          <div className="flex flex-col md:gap-4 gap-3">
               <h1 className="sm:text-xl text-lg font-semibold">Official Videos</h1>

               <div className="relative">

                    <div className="flex md:gap-4 gap-2 overflow-x-scroll hide-scrollbar" ref={containerRef}>
                         {
                              videosData?.map((video: VideoType) => (
                                   <div className="lg:min-w-[280px] md:min-w-[240px] min-w-[200px] max-w-[280px]" key={video.key}>

                                        <div className="relative rounded-md overflow-hidden md:h-[160px] h-[130px] w-[100%]
                                                       cursor-pointer group border-2 border-logo-inherit border-opacity-0 hover:border-opacity-100 duration-300"
                                             onClick={() => changeVideoMode(video.key)}>

                                             <LazyImage
                                                  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                                  alt="thumbnail"
                                                  className="w-[100%] h-[100%] object-cover object-center rounded-lg" />
                                             <PlayButton />

                                        </div>
                                        <h1 className="mt-1 text-center md:text-base text-sm">"{video.name}"</h1>
                                   </div>
                              ))
                         }
                    </div>

                    <Controller direction="left" forwardedRef={containerRef} />

                    <Controller direction="right" forwardedRef={containerRef} />

               </div>
          </div>
     )
}
