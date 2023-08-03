import { useGlobalContext } from "../../stateManagement/context"

export function OverlayEffect() {

     const { changeMenuTogglerState } = useGlobalContext()

     return (
          // overlay effect to add when menuTogglerState is true
          <div className="fixed top-0 z-40 inset-0 duration-300 bg-slate-900/70 backdrop-blur-sm md:hidden"
               onClick={changeMenuTogglerState}>
          </div>
     )
}
