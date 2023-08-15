import { lazy } from 'react'

export function lazyLoader(componentName: string) {
     return (
          lazy(() => (
               import(`../Pages/${componentName}.tsx`)
                    .then(module => ({ default: module[componentName] }))
          ))
     )
}
