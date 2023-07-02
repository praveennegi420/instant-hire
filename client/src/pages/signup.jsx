import Navbar from "../components/navbar";

export default function Signup() {
    return (
        <>
            <Navbar />
            <div className="w-[100%] h-[80vh] justify-center items-center flex">
                <div className="w-[25rem] text-center rounded-lg   nav-bar bg-white">
                    <h3>Sign Up</h3>
                    <form className="p-[20px] bg-termWhite">
                        <div className="w-[80%] mx-auto text-left ">
                            <div className="mt-[20px] w-[100%] flex ">Name <input type="text" className="ml-auto" /></div>
                            <div className="mt-[20px] w-[100%] flex ">Email <input type="text" className="ml-auto" /></div>
                            <div className="mt-[20px] w-[100%] flex">Password <input type="text" className="ml-auto" /></div>
                            <button className="bg-learnWhite">Sign Up</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}