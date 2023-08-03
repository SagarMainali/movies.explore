import ReactPlayer from 'react-player/youtube'

export function VideoPopup(
     { videoKey, setTrailerMode }: { videoKey: string, setTrailerMode: React.Dispatch<React.SetStateAction<boolean>> }) {     
     
     return (
          <div
               className="fixed h-[100vh] w-[100vw] top-0 left-0 z-50 flex justify-center items-center bg-slate-900/70 backdrop-blur-sm"
               onClick={() => setTrailerMode(false)}>
               <div className='h-[80%] w-[80%] rounded-lg overflow-hidden'>
                    <ReactPlayer
                         url={`https://youtu.be/${videoKey}`}
                         controls
                         width="100%"
                         height="100%"
                    />
               </div>
          </div>
     )
}
