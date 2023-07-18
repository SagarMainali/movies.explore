import '../../styles/loading.css'

export default function loading() {
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