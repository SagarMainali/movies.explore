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
               <div className="pt-[60px] grid grid-cols-5 gap-4">
                    {
                         data?.map(
                              (movie: MovieAndShowsDetails) => <Card key={movie.id} {...movie} />
                         )
                    }
               </div>
     )
}