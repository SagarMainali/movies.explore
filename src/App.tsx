import { Routes, Route } from 'react-router-dom'
import { GlobalContextProvider } from './stateManagement/context'
import { Layout } from './Layout'
import { lazyLoader } from './codeSplitting/lazyLoader'

// dynamic import 
const LazyHome = lazyLoader('Home')
const LazyExplorer = lazyLoader('Explorer')
const LazySearchResults = lazyLoader('SearchResults')
const LazyDetails = lazyLoader('Details')
const LazyPageNotFound = lazyLoader('PageNotFound')

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