import { Banner } from "../Components/homePageComponents/Banner"
import { Category } from "../Components/homePageComponents/Category"
import { Footer } from "../Components/homePageComponents/Footer"

export function Home() {

     return (
          <div className="flex flex-col gap-8 relative">

               <Banner />

               <Category category={'Now playing'} />

               <Category category={'Trending Now'} />

               <Category category={"What's Popular"} />

               <Category category={'Top rated'} />

               <Footer />
          </div>
     )
}