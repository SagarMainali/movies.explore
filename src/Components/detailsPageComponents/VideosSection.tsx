import { VideoModeType, VideoType } from "../../types/type"
import { PlayButton } from "./PlayButton"

export default function VideosSection({ videosData, changeVideoMode }: {
     videosData: VideoType[],
     videoMode: VideoModeType,
     changeVideoMode: (key?: string) => void
}) {
     return (
          <div className="flex flex-col gap-4">
               <h1 className="sm:text-xl text-lg font-semibold">Official Videos</h1>
               <div className="flex gap-4 overflow-x-scroll hide-scrollbar">
                    {
                         videosData?.map((video: VideoType) => (
                              <div className="min-w-[280px] max-w-[280px]" key={video.key}>
                                   <div
                                        className="rounded-md h-[160px] bg-no-repeat bg-center flex justify-center items-center 
                                        cursor-pointer group border-2 border-logo-inherit border-opacity-0 hover:border-opacity-100 duration-300"
                                        style={{ backgroundImage: `url(https://img.youtube.com/vi/${video.key}/mqdefault.jpg)` }}
                                        onClick={() => changeVideoMode(video.key)}
                                   >
                                        <PlayButton />
                                   </div>
                                   <h1 className="mt-1 text-center">"{video.name}"</h1>
                              </div>
                         ))
                    }
               </div>
          </div>
     )
}
