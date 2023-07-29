import { Routes, Route } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './pages/Home'
import { Details } from './pages/Details'
import { PageNotFound } from './Components/helperComponents/Not-found'
import { GlobalContextProvider } from './stateManagement/context'
import { Explorer } from './pages/Explorer'

export function App() {

  return (
    <div className="max-w-[1500px] mx-auto text-slate-300 overflow-hidden">
      <GlobalContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Explorer explore={'movie'} />} />
            <Route path="tvshows" element={<Explorer explore={'tv'} />} />
            <Route path="details/:id" element={<Details />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </GlobalContextProvider>
    </div >
  )
}