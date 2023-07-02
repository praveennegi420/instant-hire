import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";

const PrettoSlider = styled(Slider)({
  color: "rgba(249, 221, 215, 1)",
  height: "1rem",
  padding: "0",
  "& .MuiSlider-track": {
    border: "none",
    height: "1em",
    borderRadius: "0.5em",
    background: "rgba(255, 61, 20, 0.7)",
  },
  "& .MuiSlider-thumb": {
    height: "1.7em",
    width: "1.7em",
    backgroundColor: "#fff",
    border: "2px solid rgba(255, 61, 20, 0.7)",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
});


function FilterRangeSlider({ range, min, max, fitlerName, setRange, disable }) {
  return (
    <Box sx={{ width: "100%" }}>
      <div className="font-bold relative text-xl font-roboto select-none">
        {fitlerName}
      </div>
      <PrettoSlider
        disabled={disable}
        onChange={(e) => setRange(e.target.value)}
        min={min}
        className="p-0"
        max={max}
        value={range}
      />
    </Box>
  );
}



const FilterAdminModal = ({ isOpen, setIsOpen, handleFilter }) => {

  const formClose = () => { setIsOpen(false) };
  const [cgpa, setCgpa] = useState('')
  const [experience, setExperience] = useState('')
  const [pricingRange, setPricingRange] = useState(0);


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => formClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-trans-card bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-[700px] transform overflow-hidden 
                rounded-2xl bg-white p-6 text-left align-middle shadow-xl shadow-item-shadow transition-all"
              >
                <h1>Filters</h1>
                <div
                  onClick={() => formClose()}
                  className="absolute right-[-1rem] cursor-pointer top-[.5rem] w-[25px]
                   h-[25px] flex items-center justify-center border-2 p-2 border-gray rounded-full mr-[2rem]"
                >
                  <figure>
                    <img src="./images/cross.png" alt="cancel form" />
                  </figure>
                </div>
                <div>
                  <div className="w-[35em] mx-auto">

                  </div>
                  <div className="relative">
                    <div className=" top-0 left-0 right-0 flex justify-center absolute font-bold text-xl font-roboto select-none">
                      {pricingRange}
                    </div>
                    <FilterRangeSlider
                      disable={false}
                      range={pricingRange}
                      min={0}
                      max={100000}
                      fitlerName={"Expected CTC"}
                      setRange={setPricingRange}
                    />

                    <div className="flex justify-between text-[14px] font-gill select-none">
                      <span>$0</span>
                      <span>$100000</span>
                    </div>
                  </div>
                  <div className="flex justify-evenly">
                    <TextField id="outlined-basic" label="Minimum CGPA" variant="outlined" value={cgpa}
                      onChange={() => { setCgpa(event.target.value); }} />
                    <TextField id="outlined-basic" label="Minimum Experience" variant="outlined" value={experience}
                      onChange={() => { setExperience(event.target.value); }} />
                  </div>

                  <div className="flex justify-center mt-[1rem]">
                    <button
                      onClick={() => handleFilter({ pricingRange, cgpa, experience })}
                      className="bg-blue hover:bg-mid-blue rounded-lg py-2 px-16 text-white font-roboto "
                    >
                      Apply Filter
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default FilterAdminModal;