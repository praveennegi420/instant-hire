import Navbar from "../components/navbar"
import Job from "../components/jobs"
import Applicants from "../components/applicants"
export default function Home(){

    return (
        <>
            <Navbar/>  
            <div className="job-container">
               <Applicants />   
            </div>   
        </>
    )
}