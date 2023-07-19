import { Routes, Route } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Pages/Home'
import { Movies } from './Pages/Movies'
import { Tvshows } from './Pages/Tvshows'
import { Details } from './Pages/Details'
import { PageNotFound } from './Components/HelperComponents/Not-found'
import { GlobalContextProvider } from './state_management/context'

export function App() {

  return (
    <div className="max-w-[1500px] mx-auto text-slate-300">
      <GlobalContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movies">
              <Route index element={<Movies />} />
              <Route path=":id" element={<Details />} />
            </Route>
            <Route path='tvshows' element={<Tvshows />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </GlobalContextProvider>
    </div >
  )
}