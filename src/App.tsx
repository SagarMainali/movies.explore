import { Routes, Route } from 'react-router-dom'
import { Layout } from './Components/Layout'
import { Home } from './Pages/Home'
import { Movies } from './Pages/Movies'
import { Tvshows } from './Pages/Tvshows'

export function App() {

  return (
    <div className="app max-w-[1500px] mx-auto max-2xl:px-3 text-slate-300">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/tvshows' element={<Tvshows />} />
        </Route>
      </Routes>
    </div>
  )
}