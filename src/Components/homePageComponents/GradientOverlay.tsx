import '../../styles/gradient_overlay.css'
import { ChildrenType } from '../../types/type'

// an overlay with side left,right and bottom for banner images
export function GradientOverlay({ children }: ChildrenType) {
     return (
          <div className="overlay-lrb flex items-end absolute inset-0">
               {children}
          </div>
     )
}