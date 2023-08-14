import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export function LazyLoadImg({ src, alt, className }: { src: string, alt: string, className: string }) {
     return (
          <div>
               <LazyLoadImage
                    src={src}
                    alt={alt}
                    effect='blur'
                    className={className}
               />
          </div>
     )
}
