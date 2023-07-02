import React from 'react'
import {useState} from 'react';
import {LockClosedIcon} from "@heroicons/react/solid";
import axios from 'axios';
import apply from '/images/apply.png'
const Apply = () => {
    
    try{
        // comapany information fetch
        // const {title, company, location, skills,type,description} = axios.post();
        console.log('abhishek');
    }catch(error) {
        alert("Some Error Occured! Try again later");
    }
    const[name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [salary, setSalary] = useState("");
    const [cgpa, setCgpa] = useState("");
    const[skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    async function submitApplication(e) {
        e.preventDefault();
        // form submit;
        // try {
        //     const res = await axios.post('', {
        //       name,
        //       email,
        //       phone,
        //       salary,
        //       cgpa,
        //       experience,
                // skills,
        // 
        //     });
        //   } catch (error) {
        //     console.log('Registration failed. Please try again later');
        //   }
    }
  return (
    <>
            <div className= " min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="relative mt-9 h-100% w-74 mr-4 p-4 overflow-hidden bg-white shadow-lg rounded-2xl">
                
                <div className="h-5/6 p-2 mt-18">
                    <p className="mb-2 text-center text-lg font-medium text-gray-900">
                        Job Title
                    </p>
                    <p className="mb-2  text-lg font-medium text-gray-900">
                        company
                    </p>
                    <p className="text-s text-black-400">
                    Job description: An Accounting Manager is a professional who makes sure that financial reports are up-to-date and compliant with standards. They produce periodic activity updates for top management and an annual budget proposal.
                    </p>
                    <p className="text-xl font-medium text-indigo-500">
                        skills Required :
                    </p>
                    <p className="text-x font-medium text-black-500">
                        Type: 
                    </p>
                    <p className="text-x font-medium text-black-500">
                        location: 
                    </p>
                </div>
            </div>
            
            </div>


            <div className="max-w-md w-full space-y-8">
            <div>
                <img
                className="mx-auto h-12 w-auto"
                src={apply}
                alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Apply to the job</h2>
                
            </div>
            <form className="mt-8 space-y-6" onSubmit={submitApplication}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="name" className="sr-only">
                        Name
                    </label>
                    <input
                    id="name"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    required
                    className="appearance-none rounded-none relative block
                    w-full px-3 py-2 border border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500
                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">
                    Email address
                    </label>
                    <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block
                    w-full px-3 py-2 border border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500
                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="sr-only">
                    Phone-No
                    </label>
                    <input
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={e =>setPhone(e.target.value)}
                    type="text"
                    required
                    className="appearance-none rounded-none relative block
                    w-full px-3 py-2 border border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-b-md
                    focus:outline-none focus:ring-indigo-500
                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="phone"
                    />
                </div>
                <div>
                    <label htmlFor="experience" className="sr-only">
                        Experience
                    </label>
                    <input
                    id="experience"
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    type="text"
                    required
                    className="appearance-none rounded-none relative block
                    w-full px-3 py-2 border border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500
                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Experience"
                    />
                </div>
                </div>
                
                <div className="flex items-center justify-between">
                <div>
                    <label htmlFor="Cgpa" className="sr-only">
                        Cgpa
                    </label>
                    <input
                    id="cgpa"
                    value={cgpa}
                    onChange={e => setCgpa(e.target.value)}
                    type="text"
                    required
                    className="appearance-none rounded-none relative block
                    w-50% px-3 py-2 border border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500
                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Cgpa"
                    />
                </div>
                <div>
                    <label htmlFor="salary" className="sr-only">
                        Salary
                    </label>
                    <input
                    id="salary"
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                    type="text"
                    required
                    className="appearance-none rounded-none relative block
                    w-50% px-3 py-2 border border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500
                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Salary expectation"
                    />
                </div>
                </div>
                <div>
                    <label htmlFor="skills" className="sr-only">
                        skills
                    </label>
                    <input
                    id="skills"
                    name="skills"
                    value={skills}
                    onChange={e => setSkills(e.target.value)}
                    type="text"
                    required
                    className="appearance-none rounded-none relative block
                    w-full px-3 py-2 border border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500
                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="skills"
                    />
                </div>
                <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center
                    py-2 px-4 border border-transparent text-sm font-medium
                    rounded-md text-white bg-green-600 hover:bg-green-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    focus:ring-indigo-500"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    
                    </span>
                    Apply
                </button>
                </div>
            </form>
            </div>
            
        </div>
    </>
  )
}

export default Apply
