import { Banner } from "../Components/homeComponents/Banner"
import { Category } from "../Components/homeComponents/Category"
import { useGlobalContext } from "../stateManagement/context"

export function Home() {

     const { menuTogglerActive, changeMenuTogglerState } = useGlobalContext()

     return (
          <div className="flex flex-col gap-10 relative">
               {
                    // overlay on top of the GradientOverlay if the main-menu is active
                    menuTogglerActive &&
                    <div className="absolute top-0 z-10 inset-0 duration-300 bg-slate-900/70 md:hidden"
                         onClick={changeMenuTogglerState}></div>
               }
               <Banner />
               <Category category={'Trending Now'} />
               <Category category={"What's Popular"} />
               <Category category={'Top rated'} />
               <Category category={'Now playing'} />
          </div>
     )
}