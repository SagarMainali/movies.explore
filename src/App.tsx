import { Routes, Route } from 'react-router-dom'
import { Layout } from './Layout'
import { GlobalContextProvider } from './stateManagement/context'
import { lazyLoader } from './codeSplitting/lazyLoader'

// dynamic import
const LazyHome = lazyLoader('../pages/Home.tsx', 'Home')
const LazyExplorer = lazyLoader('../pages/Explorer.tsx', 'Explorer')
const LazySearchResults = lazyLoader('../pages/SearchResults.tsx', 'SearchResults')
const LazyDetails = lazyLoader('../pages/Details.tsx', 'Details')
const LazyPageNotFound = lazyLoader('../pages/PageNotFound.tsx', 'PageNotFound')

export function App() {

  return (
    <div className="max-w-[1500px] mx-auto text-slate-300 pb-6 overflow-hidden">
      <GlobalContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<LazyHome />} />
            <Route path="movies" element={<LazyExplorer explore={'movie'} />} />
            <Route path="tvshows" element={<LazyExplorer explore={'tv'} />} />
            <Route path="search/:searchQuery" element={<LazySearchResults />} />
            <Route path=":media_type/:id" element={<LazyDetails />} />
            <Route path='*' element={<LazyPageNotFound />} />
          </Route>
        </Routes>
      </GlobalContextProvider>
    </div >
  )
}