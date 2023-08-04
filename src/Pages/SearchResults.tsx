import { useParams } from "react-router-dom"
import { fetchDataFromApi } from "../utils/api"
import { Loading } from "../Components/helperComponents/Loading"
import { MovieAndShowsDetails } from "../types/type"
import { Card } from "../Components/globalComponents/Card"

export function SearchResults() {

     const { searchQuery } = useParams()

     const { data, isLoading } = fetchDataFromApi(`/search/multi?query=${searchQuery}`)

     return (
          isLoading
               ?
               <Loading />
               :
               <div className="py-[60px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-6">
                    {
                         // first checking the type of 'data' which should return true and proceed if it is an array
                         Array.isArray(data) && data?.map(
                              (movieOrShow: MovieAndShowsDetails) => <Card key={movieOrShow.id} {...movieOrShow} customMediaType={movieOrShow.media_type} />
                         )
                    }
               </div>
     )
}
