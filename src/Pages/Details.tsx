import { useParams } from "react-router-dom"
import { fetchDataFromApi, image_baseUrl } from "../utils/api"
import { Loading } from "../Components/helperComponents/Loading"
import '../styles/gradient_overlay.css'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { circularProgressbarStyles } from "../Components/Card"

export function Details() {

  const { media_type, id } = useParams()

  const { data, isLoading } = fetchDataFromApi(`/${media_type}/${id}`)

  return (
    isLoading && !data
      ?
      <Loading />
      :
      data && typeof (data) === 'object' && !Array.isArray(data) &&
      <div className="main-detail-container">

        <div className="detail h-[85vh] relative">
          <div
            className="bg-no-repeat bg-cover bg-center h-[80%] w-full relative"
            style={{ backgroundImage: `url(${image_baseUrl + data.backdrop_path})` }}>
            <div className="overlay-lrb h-full w-full absolute inset-0"></div>
          </div>
          <div className="absolute bottom-0 w-full flex justify-center">
            <div className="w-[80%] flex gap-3">
              <img src={image_baseUrl + data.poster_path} alt="posterImg" className="rounded-lg max-h-[350px]" />
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-4xl text-slate-100">{data.title || data.name}</h1>
                <h1 className="font-medium text-base italic text-slate-200">{data.tagline}</h1>
                <div className="flex gap-2 items-center">
                  {
                    data.genres.map(genre => <span className="bg-slate-200 rounded-md px-[6px] py-[2px] text-primary-dark text-[10px] font-bold">
                      {genre.name}
                    </span>)
                  }
                </div>
                <div className="flex gap-2 ites-center">
                  <span className="h-[50px] w-[50px]">
                    <CircularProgressbar
                      maxValue={10} value={data.vote_average} text={`${data.vote_average?.toFixed(1)}`}
                      strokeWidth={9} background
                      styles={{
                        ...circularProgressbarStyles, path: {
                          stroke: data.vote_average >= 6.5 ? '#0FB6DF' : '#f07b41'
                        }
                      }} />
                  </span>
                  <span className="border-2 border-slate-200 rounded-full flex justify-center items-center p-2 cursor-pointer h-[50px] w-[50px] group" title="Play Trailer">
                    <svg className='fill-slate-200 group-hover:scale-[.85] duration-300' xmlns="http://www.w3.org/2000/svg" height="1.6rem" viewBox="0 0 384 512">
                      <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                    </svg>
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="bg-slate-200 rounded-md px-[6px] py-[2px] text-primary-dark text-[10px] font-bold">{media_type?.toUpperCase()}</span>
                  <span className="bg-slate-200 rounded-md px-[6px] py-[2px] text-primary-dark text-[10px] font-bold">{data.original_language?.toUpperCase()}</span>
                </div>
                {
                  media_type === 'movie'
                    ?
                    <div className="flex gap-4 text-sm">
                      <h4 className='font-semibold'>Released on: <span className="text-slate-300 font-normal">{data.release_date || data.first_air_date}</span></h4>
                      <h4 className='font-semibold'>Status: <span className="text-slate-300 font-normal">{data.status}</span></h4>
                      <h4 className='font-semibold'>Running Time: <span className="text-slate-300 font-normal">{data.runtime} minutes</span></h4>
                    </div>
                    :
                    <div className="flex gap-4 text-sm">
                      <h4 className='font-semibold'>First aired on: <span className="text-slate-300 font-normal">{data.release_date || data.first_air_date}</span></h4>
                      <h4 className='font-semibold'>No of Episodes: <span className="text-slate-300 font-normal">{data.number_of_seasons}</span></h4>
                      <h4 className='font-semibold'>No of Seasons: <span className="text-slate-300 font-normal">{data.number_of_episodes}</span></h4>
                    </div>
                }
                {media_type === 'movie' &&
                  <div className="flex gap-4 text-sm">
                    <h4 className='font-semibold'>Budget: <span className="text-slate-300 font-normal">{data.budget}</span></h4>
                    <h4 className='font-semibold'>Box office: <span className="text-slate-300 font-normal">{data.revenue}</span></h4>
                  </div>
                }
                <p className="text-slate-300">{data.overview}</p>

              </div>
            </div>
          </div>
        </div>

        {/* <div className="cast"></div>

        <div className="videos"></div>

        <div className="similar-movies"></div> */}
      </div >
  )
}