import { lazy } from 'react'

// custom function for lazy loading a Component
export function lazyLoader(componentName: string) {
     return (
          lazy(() => (
               import(`../Pages/${componentName}.tsx`)
                    .then(module => ({ default: module[componentName] }))
          ))
     )
}
