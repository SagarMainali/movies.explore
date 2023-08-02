import { fetchDataFromApi } from "../utils/api"
import { Loading } from "../Components/helperComponents/Loading"
import { MovieAndShowsDetails } from "../types/type"
import { Card } from "../Components/globalComponents/Card"

export function Explorer({ explore }: { explore: string }) {

     const { data, isLoading } = fetchDataFromApi(`/discover/${explore}`)

     return (
          isLoading
               ?
               <Loading />
               :
               <div className="py-[60px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-6">
                    {
                         // first checking the type of 'data' which should return true and proceed if it is an array
                         Array.isArray(data) && data?.map(
                              (movie: MovieAndShowsDetails) => <Card key={movie.id} {...movie} customMediaType={explore} />
                         )
                    }
               </div>
     )
}
