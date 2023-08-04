import { MovieAndShowsDetails } from "../../types/type"
import { fetchDataFromApi } from "../../utils/api"
import { Card } from "../globalComponents/Card"
import '../../styles/category.css'

export function SuggestedCategory({ id, media_type, category }: { id: string | undefined, media_type: string | undefined, category: string }) {

     const endpoint = `/${media_type}/${id}/${category}`

     const { data } = fetchDataFromApi(endpoint)

     const category_title = category === 'similar'
          ? `Similar ${media_type === 'movie'
               ? 'Movies' : 'Tv Shows'}`
          : 'Recommendations'

     return (
          Array.isArray(data) && data.length > 0
          &&
          <div className="flex flex-col gap-3">
               <h1 className="sm:text-xl text-lg font-semibold">
                    {category_title}
               </h1>
               <div className="hide-scrollbar flex gap-3 overflow-x-scroll">
                    {
                         data.map(
                              (movieOrShow: MovieAndShowsDetails) => <Card key={movieOrShow.id} customMediaType={media_type} {...movieOrShow} />
                         )
                    }
               </div>
          </div>
     )
}
