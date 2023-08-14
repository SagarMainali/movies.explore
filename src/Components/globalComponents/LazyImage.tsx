import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export function LazyImage({ src, alt }: { src: string, alt: string }) {
     return (
          <LazyLoadImage
               src={src}
               alt={alt}
               effect='blur'
          />
     )
}
