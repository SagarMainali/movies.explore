import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export function LazyLoadImg({ imgSrc, alt }: { imgSrc: string, alt: string }) {
     return (
          <div>
               <LazyLoadImage
                    src={imgSrc}
                    alt='alt'
                    effect='blur'
               />
          </div>
     )
}
