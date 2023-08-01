import { useParams } from "react-router-dom"
import { fetchDataFromApi } from "../utils/api"
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
        <h2>Movie/Show id = {id}</h2>
      </div>
  )
}
