import { Routes, Route } from 'react-router-dom'
import { Layout } from './Components/Layout'
import { Home } from './Pages/Home'
import { Movies } from './Pages/Movies'
import { Tvshows } from './Pages/Tvshows'
import { Details } from './Pages/Details'
import { PageNotFound } from './Not-found'

export function App() {

  return (
    <div className="max-w-[1500px] mx-auto text-slate-300">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/tvshows' element={<Tvshows />} />
          <Route path='/details' element={<Details />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}