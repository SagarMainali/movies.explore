import { useParams } from "react-router-dom"
import { useFetchDataFromApi } from "../utils/api"
import { Loading } from "../Components/helperComponents/Loading"
import { MovieAndShowsDetails } from "../types/type"
import { Card } from "../Components/globalComponents/Card"
import { NoResults } from "../Components/helperComponents/NoResults"

export function SearchResults() {

     const { searchQuery } = useParams()

     const { data, isLoading } = useFetchDataFromApi(`/search/multi?query=${searchQuery}`)

     // const [pageNum, setPageNum]

     return (
          isLoading
               ?
               <Loading />
               : data.length > 0
                    ?
                    <div className="py-[60px] grid sm:gap-x-4 sm:gap-y-6 gap-x-3 gap-y-5 xl:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 xsm:grid-cols-3 grid-cols-2">
                         {
                              // first checking the type of 'data' which should return true and proceed if it is an array
                              Array.isArray(data) && data?.map(
                                   (movieOrShow: MovieAndShowsDetails) => {
                                        if (movieOrShow.media_type === 'person') return
                                        return <Card key={movieOrShow.id} {...movieOrShow} customMediaType={movieOrShow.media_type} />
                                   }
                              )
                         }
                    </div>
                    :
                    <NoResults searchQuery={searchQuery} />
     )
}
