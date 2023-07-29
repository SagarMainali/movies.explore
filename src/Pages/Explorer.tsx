import { fetchDataFromApi } from "../utils/api"
import { Loading } from "../Components/helperComponents/Loading"
import { MovieAndShowsDetails } from "../types/type"
import { Card } from "../Components/Card"

export function Explorer({ explore }: { explore: string }) {

     const { data, isLoading } = fetchDataFromApi(`/discover/${explore}`)

     return (
          isLoading
               ?
               <Loading />
               :
               <div className="py-[60px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
                    {
                         data?.map(
                              (movie: MovieAndShowsDetails) => <Card key={movie.id} {...movie} />
                         )
                    }
               </div>
     )
}
