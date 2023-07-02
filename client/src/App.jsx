import Home from './pages/Home'
import Applicants from './pages/applicants'
import Signup from './pages/signup'

import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/applicants' element={<Applicants/>} />
      </Routes>
    </>
  )
}

export default App
