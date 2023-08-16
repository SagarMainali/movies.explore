import { useParams } from "react-router-dom"
import { useFetchDataFromApi } from "../utils/api"
import { Loading } from "../Components/helperComponents/Loading"
import 'react-circular-progressbar/dist/styles.css'
import { SuggestedCategory } from "../Components/detailsPageComponents/SuggestedCategory"
import { CastSection } from "../Components/detailsPageComponents/CastSection"
import { DetailsSection } from "../Components/detailsPageComponents/DetailSection"
import { MovieAndShowsDetails, VideoModeType, VideoType } from "../types/type"
import { useEffect, useState } from "react"
import VideosSection from "../Components/detailsPageComponents/VideosSection"

export function Details() {

  const { media_type, id } = useParams()

  const { data: movieOrShowData, isLoading } = useFetchDataFromApi(`/${media_type}/${id}`)

  const { data: videosData } = useFetchDataFromApi(`/${media_type}/${id}/videos`)

  // for storing video key of trailer type only
  const [trailer, setTrailer] = useState<VideoType>({} as VideoType)

  // for popups that plays video
  const [videoMode, setVideoMode] = useState<VideoModeType>({} as VideoModeType)

  function changeVideoMode(key?: string): void {
    if (key) {
      setVideoMode({ openVideo: true, videoKey: key })
    }
    else {
      setVideoMode({ openVideo: false, videoKey: null })
    }
  }

  // out of all the overwelming video keys that we get, only pick one that is the actual trailer 
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

        <DetailsSection
          movieOrShowData={movieOrShowData as MovieAndShowsDetails}
          trailer={trailer as VideoType}
          media_type={media_type}
          videoMode={videoMode}
          setVideoMode={setVideoMode}
          changeVideoMode={changeVideoMode}
        />

        {/* separate container because to match the width 80% of the DetailsSeciont's content */}
        <div className="lg:w-[90%] w-[100%] mx-auto flex flex-col gap-10 overflow-hidden">

          <CastSection endpoint={`/${media_type}/${id}/credits`} />

          <VideosSection
            videosData={videosData as VideoType[]}
            videoMode={videoMode}
            changeVideoMode={changeVideoMode}
          />

          <SuggestedCategory media_type={media_type} id={id} category='similar' />

          <SuggestedCategory media_type={media_type} id={id} category='recommendations' />

        </div>

      </div >
  )
}