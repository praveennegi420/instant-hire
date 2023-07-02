import Navbar from "../components/navbar"
import Applicants from "../components/applicants"

export default function Dashboard(){

    return (
        <>
            <Navbar/>  
            <div className="job-container mt-[5rem] flex justify-between">
               <Applicants />   
            </div>   
        </>
    )
}