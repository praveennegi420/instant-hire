import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import {useDispatch,useSelector} from 'react-redux';
import { addToken } from "../features/authSlice";
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post('http://localhost:8080/api/auth/login', {email,password});
      localStorage.setItem('token',JSON.stringify(data.data));
      dispatch(addToken());
      setRedirect(true);
    } catch (error) {
      console.log(error)
      alert('Login failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <>
    <Navbar />
    <div className="mt-20 grow flex items-center  justify-around">
      <div className="pt-10 mb-64">
        <h1 className="text-5xl text-center mb-4">Login</h1>
        <form className="pt-4 max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to={'/signup'}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}