import Navbar from "../components/navbar"
import Job from "../components/jobs"
import Applicants from "../components/applicants"
export default function Home(){

    return (
        <>
            <Navbar/>  
            <div className="job-container mt-[5rem] flex justify-between">
               <Job />   
            </div>   
        </>
    )
}