import '../../styles/gradient_overlay.css'
import { ChildrenType } from '../../types/type'

export function GradientOverlay({ children }: ChildrenType) {
     return (
          <div className="overlay-lrb flex items-end h-full w-full">
               {children}
          </div>
     )
}