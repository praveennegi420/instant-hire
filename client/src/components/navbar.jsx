import { Link } from 'react-router-dom'
import {useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Navigate } from 'react-router-dom';
import image from '/images/user.png'
import { reset } from '../features/authSlice';
export default function Navbar() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    function toggleUser() {
        dispatch(reset());
    }
    function toggleOpen() {
        setOpen(prev => !prev);
    }
    return (

        <>
            <nav className="w-[100%]">
                <div className="h-[8vh] flex items-center nav-bar">
                    <h3 className="pl-[3rem]">Instant Hire</h3>
                    
                    {
                        !token?
                        <>
                        <button type="button" aria-label="Options" className="ml-auto nav-link">
                            <Link to='/login'>Log In</Link>
                        </button>
                        <button type="button" aria-label="Options" className="mx-[2rem] nav-link">
                            <Link to='/signup'>Sign Up</Link>
                        </button>
                        </>: 
                        <>
                            <img src= {image} alt="image"
                            className=" profile-image ml-auto  cursor-pointer"
                            onClick={toggleOpen}
                            />
                            {open&&
                                <div className=' rounded-l absolute right-2 top-12  bg-white p-4 w-52 shadow'>
                                <ul>
                                <li className='cursor-pointer text-1xl pl-1' onClick={toggleUser}>Log out</li>
                                </ul>
                                </div>
                            }
                        </>
                    }
                </div>
            </nav>
        
        </>
    )
}