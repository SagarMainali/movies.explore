import { Banner } from "../Components/homePageComponents/Banner"
import { Category } from "../Components/homePageComponents/Category"
import { Footer } from "../Components/homePageComponents/Footer"
import { useGlobalContext } from "../stateManagement/context"

export function Home() {

     const { menuTogglerActive, changeMenuTogglerState } = useGlobalContext()

     return (
          <div className="flex flex-col gap-10 relative">
               {
                    // overlay on top of the GradientOverlay if the main-menu is active
                    menuTogglerActive &&
                    <div className="absolute top-0 z-10 inset-0 duration-300 bg-slate-900/70 backdrop-blur-sm md:hidden"
                         onClick={changeMenuTogglerState}>
                    </div>
               }
               <Banner />

               <Category category={'Trending Now'} />

               <Category category={"What's Popular"} />

               <Category category={'Top rated'} />

               <Category category={'Now playing'} />

               <Footer />
          </div>
     )
}