import { Banner } from "../Components/homeComponents/Banner"
import { Category } from "../Components/homeComponents/Category"

export function Home() {
     return (
          <div className="flex flex-col gap-10">
               <Banner />
               <Category category={'Trending Now'} />
               <Category category={"What's Popular"} />
               <Category category={'Top rated'} />
               <Category category={'Now playing'} />
          </div>
     )
}