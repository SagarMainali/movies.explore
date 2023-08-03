import { useParams } from "react-router-dom"
import { fetchDataFromApi } from "../utils/api"
import { Loading } from "../Components/helperComponents/Loading"
import '../styles/gradient_overlay.css'
import 'react-circular-progressbar/dist/styles.css'
import { SuggestedCategory } from "../Components/detailsPageComponents/SuggestedCategory"
import { CastSection } from "../Components/detailsPageComponents/CastSection"
import { DetailsSection } from "../Components/detailsPageComponents/DetailSection"
import { MovieAndShowsDetails, VideoType } from "../types/type"
import { useEffect, useState } from "react"

export function Details() {

  const { media_type, id } = useParams()

  const { data: movieOrShowData, isLoading } = fetchDataFromApi(`/${media_type}/${id}`)

  const { data: videosData } = fetchDataFromApi(`/${media_type}/${id}/videos`)

  const [trailer, setTrailer] = useState<VideoType>({} as VideoType)

  useEffect(() => {
    if (videosData) {
      const trailersOnly = videosData.filter(
        (videoData: VideoType) => (
          videoData.type === 'Trailer'
        )
      )
      setTrailer(trailersOnly[0])
    }
  }, [videosData])


  return (
    isLoading && !movieOrShowData
      ?
      <Loading />
      :
      <div className="flex flex-col gap-10">

        <DetailsSection movieOrShowData={movieOrShowData as MovieAndShowsDetails} trailer={trailer as VideoType} media_type={media_type} />

        {/* separate container because to match the width 80% of the DetailsSeciont's content */}
        <div className="lg:w-[85%] w-[100%] mx-auto flex flex-col gap-10 overflow-hidden">

          <CastSection endpoint={`/${media_type}/${id}/credits`} />

          <SuggestedCategory media_type={media_type} id={id} category='similar' />

          <SuggestedCategory media_type={media_type} id={id} category='recommendations' />

        </div>

      </div >
  )
}