import { VideoModeType, VideoType } from "../../types/type"
import { Controller } from "../globalComponents/Controller"
import { LazyImage } from "../globalComponents/LazyImage"
import { PlayButton } from "./PlayButton"
import { useRef, useState, useEffect } from 'react'

export default function VideosSection({ videosData, changeVideoMode }: {
     videosData: VideoType[],
     videoMode: VideoModeType,
     changeVideoMode: (key?: string) => void
}) {

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
          return () => { window.removeEventListener }
     }, [])

     return (
          videosData && videosData.length > 0
          &&
          <div className="flex flex-col md:gap-4 gap-3">
               <h1 className="sm:text-xl text-lg font-semibold">Official Videos</h1>

               <div className="relative">

                    <div className="flex md:gap-[10px] gap-[6px] overflow-x-scroll hide-scrollbar" ref={containerRef}>
                         {
                              videosData?.map((video: VideoType) => (
                                   <div key={video.key}
                                        className="max-w-[280px] lg:min-w-[calc((100%/5)-10px+calc(10px/5))] 
                                        md:min-w-[calc((100%/4)-10px+calc(10px/4))] 
                                        sm:min-w-[calc((100%/3)-6px+calc(6px/3))]
                                        min-w-[calc((100%/2)-6px+calc(6px/2))]">
                                        {/* className="lg:min-w-[280px] md:min-w-[240px] min-w-[200px] max-w-[280px]" */}
                                        <div className="relative rounded-md overflow-hidden md:h-[160px] h-[130px] w-[100%]
                                                       cursor-pointer group border-2 border-logo-inherit border-opacity-0 hover:border-opacity-100 duration-300"
                                             onClick={() => changeVideoMode(video.key)}>

                                             <LazyImage
                                                  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                                  alt="thumbnail"
                                                  className="w-[100%] h-[100%] object-cover object-center rounded-lg" />
                                             <PlayButton />

                                        </div>
                                        <h1 className="mt-1 text-center md:text-[14px] text-sm leading-[17px]">"{video.name}"</h1>
                                   </div>
                              ))
                         }
                    </div>

                    <Controller direction="left" forwardedRef={containerRef} gap={flexGap} />

                    <Controller direction="right" forwardedRef={containerRef} gap={flexGap} />

               </div>
          </div>
     )
}
