import '../../styles/loading.css'

export function Loading() {
     return (
          <div className='loading-container'>
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