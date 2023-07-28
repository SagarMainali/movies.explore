import { Routes, Route } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './pages/Home'
import { Movies } from './pages/Movies'
import { Tvshows } from './pages/Tvshows'
import { Details } from './pages/Details'
import { PageNotFound } from './Components/helperComponents/Not-found'
import { GlobalContextProvider } from './stateManagement/context'

export function App() {

  return (
    <div className="max-w-[1500px] mx-auto text-slate-300 overflow-hidden pb-6">
      <GlobalContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="tvshows" element={<Tvshows />} />
            <Route path="details/:id" element={<Details />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </GlobalContextProvider>
    </div >
  )
}