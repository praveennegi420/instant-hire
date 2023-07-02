import { Link } from 'react-router-dom'

export default function Navbar() {

    return (

        <>
            <nav className="w-[100%]">
                <div className="h-[8vh] flex items-center nav-bar">
                    <h3 className="pl-[3rem]">Instant Hire</h3>
                    <button type="button" aria-label="Options" className="ml-auto nav-link">
                        <Link to='/login'>Log In</Link></button>
                    <button type="button" aria-label="Options" className="mx-[2rem] nav-link">
                        <Link to='/signup'>Sign Up</Link></button>
                </div>
            </nav>
        </>
    )
}