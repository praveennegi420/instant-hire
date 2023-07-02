import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function registerUser(e) {
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/auth/signup', {
              name,
              email,
              password,
            });
          } catch (e) {
            console.log('Registration failed. Please try again later');
          }
    }
    return (
        <>
            <Navbar />
            <div className="mt-20 grow flex items-center justify-around">
                <div className="pt-10 mb-64">
                    <h1 className="text-5xl text-center mb-4">Signup</h1>
                    <form className="pt-4 max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                    <input type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    <input type="password"
                            placeholder="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    <button className="primary">Signup</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}