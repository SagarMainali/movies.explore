import '../../styles/gradient_overlay.css'
import { ChildrenType } from '../../types/type'

export function GradientOverlay({ children }: ChildrenType) {
     return (
          <div className="overlay-lrb flex items-end absolute inset-0">
               {children}
          </div>
     )
}