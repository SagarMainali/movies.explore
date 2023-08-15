import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export function LazyImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
     return (
          // when using effect prop, it wraps the LazyLoadImage component with a span tag
          <LazyLoadImage
               src={src}
               alt={alt}
               className={className}
               effect='blur'
               wrapperProps={{ style: { width: '100%', height: '100%' } }}
          />
     )
}
