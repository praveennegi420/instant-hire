import Home from './pages/Home'
import Signup from './pages/signup'
import LoginPage from './pages/login'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8080';
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </>
  )
}

export default App
