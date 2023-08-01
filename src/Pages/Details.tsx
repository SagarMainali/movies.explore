import { useParams } from "react-router-dom"
import { fetchDataFromApi, image_baseUrl } from "../utils/api"
import { Loading } from "../Components/helperComponents/Loading"
import '../styles/gradient_overlay.css'
import { useEffect, useState } from "react"
import { ImageUrls } from "../types/type"

export function Details() {

  const { media_type, id } = useParams()

  const { data, isLoading } = fetchDataFromApi(`/${media_type}/${id}`)

  const [imageUrls, setImageUrls] = useState<ImageUrls>({} as ImageUrls)

  useEffect(() => {
    if (data && typeof (data) === 'object' && !Array.isArray(data)) {
      setImageUrls({
        backDropUrl: `url(${image_baseUrl + data.backdrop_path})`,
        posterUrl: image_baseUrl + data.poster_path
      })
    }
  }, [data])

  return (
    isLoading && !data
      ?
      <Loading />
      :
      <div className="main-detail-container">

        <div className="detail h-[80vh] relative">
          <div
            className="bg-no-repeat bg-cover bg-center h-[80%] w-full relative"
            style={{ backgroundImage: imageUrls.backDropUrl || '' }}>
            <div className="overlay-lrb h-full w-full absolute inset-0"></div>
          </div>
          <div className="absolute bottom-0 w-[230px]">
            <img src={imageUrls.posterUrl || ''} alt="posterImg" className="rounded-lg" />

          </div>
        </div>

        {/* <div className="cast"></div>

        <div className="videos"></div>

        <div className="similar-movies"></div> */}
      </div >
  )
}
