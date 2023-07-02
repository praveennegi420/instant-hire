import Navbar from "../components/navbar"
import Job from "../components/jobs"
export default function Home(){

    return (
        <>
            <Navbar/>  
            <div className="job-container">
               <Job />   
            </div>   
        </>
    )
}