import Home from './pages/Home'
import Applicants from './pages/applicants'
import Signup from './pages/signup'
import LoginPage from './pages/login'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios';
import { UserContextProvider } from './UserContext'

axios.defaults.baseURL = 'http://127.0.0.1:8080';
function App() {

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/applicants' element={<Applicants/>} />
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
