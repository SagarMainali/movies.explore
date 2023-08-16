import ReactPlayer from 'react-player/youtube'

// popup for video player using ReactPlayer
export function VideoPopup({ videoKey, changeVideoMode, title }: {
     videoKey: string | null,
     changeVideoMode: (key?: string) => void,
     title: string
}) {

     return (
          <div
               className="fixed h-[100vh] w-[100vw] top-0 left-0 z-50 flex justify-center items-center bg-slate-900/70 backdrop-blur-md"
               onClick={() => changeVideoMode()}>
               <div className='xl:h-[70%] xl:w-[80%]
                              lg:h-[70%] lg:w-[85%]
                              md:h-[65%] md:w-[90%]
                              sm:h-[60%] sm:w-[90%]
                              h-[50%] w-[97%]
                              max-w-[1200px]
                              rounded-lg overflow-hidden flex flex-col gap-1 justify-center items-center z-30'>
                    {videoKey
                         ?
                         <>
                              <ReactPlayer
                                   url={`https://youtu.be/${videoKey}`}
                                   controls
                                   width="100%"
                                   height="100%"
                              />
                              <h1 className='text-sm italic'>*Watch on full screen mode for smooth experience*</h1>
                         </>
                         :
                         <h1 className='font-medium text-lg'>Oops! '{title}' has no videos available at all.</h1>
                    }
               </div>
          </div>
     )
}
