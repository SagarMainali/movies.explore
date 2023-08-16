import '../../styles/loading.css'

// loader when loading state is enabled
export function Loading({ forScrolling }: { forScrolling?: boolean }) {
     return (
          <div className={`loading-container ${forScrolling ? '' : 'h-[96vh]'}`}>
               <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
               </div>
          </div>
     )
}