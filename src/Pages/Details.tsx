import { useParams } from "react-router-dom"
import { fetchDataFromApi, image_baseUrl } from "../utils/api"
import { Loading } from "../Components/helperComponents/Loading"

export function Details() {

  const { media_type, id } = useParams()

  const { data, isLoading } = fetchDataFromApi(`/${media_type}/${id}`)

  return (
    isLoading
      ?
      <Loading />
      :
      <div className="pt-[50px]">
        <div className="detail-container h-[60vh] max-h-[480px] bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: (data && typeof (data) === 'object' && !Array.isArray(data)) ? `url(${image_baseUrl + data.backdrop_path})` : ''
          }}>

        </div>

        <div className="cast"></div>

        <div className="videos"></div>

        <div className="similar-movies"></div>
      </div >
  )
}
