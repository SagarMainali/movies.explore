import { useGlobalContext } from "../../stateManagement/context"
import { useEffect, useState } from 'react'

interface ControlsVisibility {
     hideLeftBtn: boolean,
     hideRightBtn: boolean
}

// controllers for sliding carousel items
export function Controller({ direction, forwardedRef, gap }: { direction: string, forwardedRef: React.RefObject<HTMLDivElement>, gap?: number }) {

     const { slider } = useGlobalContext()

     // to store the visibility state of the Controller
     const [controlsConfig, setControlsConfig] = useState<ControlsVisibility>({} as ControlsVisibility)

     function changeControlsConfig() {
          const refs = forwardedRef.current
          if (refs) {
               setControlsConfig({
                    hideLeftBtn: refs.scrollWidth === refs.offsetWidth || refs.scrollLeft < 100 ? true : false,
                    hideRightBtn: refs.scrollWidth === refs.offsetWidth || refs.scrollLeft + refs.offsetWidth + 100 >= refs.scrollWidth ? true : false
               })
          }

     }

     useEffect(() => {
          if (forwardedRef.current) {
               forwardedRef.current.addEventListener('scroll', changeControlsConfig)
          }

          return () => { forwardedRef.current?.removeEventListener('scroll', changeControlsConfig) }
     }, [forwardedRef.current])

     // run at least once without any conditions
     useEffect(() => {
          changeControlsConfig()
     }, [])

     if (direction === 'left') {
          return (
               <svg className={`h-[27px] absolute max-md:hidden top-[45%] left-2 -translate-y-[50%] z-10 
                    fill-primary-dark bg-slate-100 rounded-full cursor-pointer ${controlsConfig.hideLeftBtn ? 'md:hidden' : ''}`}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                    onClick={() => slider('left', forwardedRef, gap || 0)}>
                    <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
               </svg>
          )
     }
     else {
          return (
               <svg className={`h-[27px] absolute max-md:hidden top-[45%] right-2 -translate-y-[50%] z-10 
                    fill-primary-dark bg-slate-100 rounded-full cursor-pointer ${controlsConfig.hideRightBtn ? 'md:hidden' : ''}`}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                    onClick={() => slider('right', forwardedRef, gap || 0)}>
                    <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
               </svg>
          )
     }
}
