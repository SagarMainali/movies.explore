import { MovieAndShowsDetails } from "../../types/type"
import { fetchDataFromApi } from "../../utils/api"
import { Card } from "../Card"
import '../../styles/category.css'

export default function SuggestedCategory({ id, media_type, category }: { id: string | undefined, media_type: string | undefined, category: string }) {

     const endpoint = `/${media_type}/${id}/${category}`

     const { data } = fetchDataFromApi(endpoint)

     return (
          Array.isArray(data)
               ?
               <div className="flex flex-col gap-4 w-[80%] mx-auto">
                    <h1>{category} {media_type}</h1>
                    <div className="category flex gap-3 overflow-x-scroll">
                         {
                              data.map(
                                   (movieOrShow: MovieAndShowsDetails) => <Card customMediaType={media_type} {...movieOrShow} />
                              )
                         }
                    </div>
               </div>
               :
               <div></div>
     )
}
