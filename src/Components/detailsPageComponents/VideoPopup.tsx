import ReactPlayer from 'react-player/youtube'

export function VideoPopup(
     { videoKey, setTrailerMode, title }: { videoKey: string, setTrailerMode: React.Dispatch<React.SetStateAction<boolean>>, title: string }) {

     return (
          <div
               className="fixed h-[100vh] w-[100vw] top-0 left-0 z-10 flex justify-center items-center bg-slate-900/70 backdrop-blur-md"
               onClick={() => setTrailerMode(false)}>
               <div className='h-[80%] w-[80%] rounded-lg overflow-hidden flex flex-col gap-1 justify-center items-center z-30'>
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
