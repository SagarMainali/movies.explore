import { lazy } from 'react'

export function lazyLoader(path: string, componentName: string) {
     return (
          lazy(() => (
               import(path)
                    .then(module => ({ default: module[componentName] }))
          ))
     )
}
