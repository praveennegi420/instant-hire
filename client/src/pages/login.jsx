import {Link, Navigate} from "react-router-dom";
import {useState, useContext} from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post('/api/auth/login', {email,password});
      setUser(data);
      alert('Login successful');
      setRedirect(true);
      console.log(data);
    } catch (error) {
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
            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}