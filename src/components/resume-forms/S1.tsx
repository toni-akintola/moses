'use client'

import { ageAtom, nameAtom, proficiencyAtom } from "@/utils/atoms";
import { useAtom } from "jotai";



export default function S1() {
  const [fullName, setFullName] = useAtom(nameAtom)
  const [age, setAge] = useAtom(ageAtom)
  const [proficiency, setProficiency] = useAtom(proficiencyAtom)


  const handleAgeChange = (e: React.FormEvent<HTMLInputElement>) => {
    setAge(e.currentTarget.value)
  }

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFullName(e.currentTarget.value)
  }

  const handleProficiencyChange = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value
    setProficiency(name)
  }

  const handleClick = () => {
    console.log(age, fullName, proficiency)
  }
  return (
    <div className="border rounded-md m-6 py-12 px-6 border-gray-900/10 bg-indigo-500">
      <h2 className="text-base font-semibold leading-7 text-white">
        General Information
      </h2>
      {/* <p className="mt-1 text-sm leading-6 text-white">
            This information will be displayed publicly so be careful what you share.
          </p> */}
      <form className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label
            htmlFor="full-name"
            className="block text-sm font-medium leading-6 text-white"
          >
            Full Name
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleNameChange}
                autoComplete="name"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="janesmith"
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium leading-6 text-white"
          >
            Age
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="number"
                onChange={handleAgeChange}
                name="age"
                id="name"
                autoComplete="age"
                className="block flex-1 border-0 bg-transparent py-1.5 px-2 [&::-webkit-inner-spin-button]:appearance-none text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="18"
              />
            </div>
          </div>
        </div>
        <div className="border-b border-white pb-12">
          <div className=" space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-white">
                English Level
              </legend>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="none"
                    name="proficiency"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="none"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    None
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="basic"
                    name="proficiency"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="basic"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Basic
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="intermediate"
                    name="proficiency"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="intermediate"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Intermediate
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="advanced"
                    name="proficiency"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="advanced"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Advanced
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="conversational"
                    name="proficiency"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="conversational"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Conversational
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="col-span-full">
          <div className="mt-2 flex items-center justify-center">
            <button onClick={handleClick}  type="button" className="bg-white text-indigo-500 py-2 px-4 rounded-md hover:bg-gray-200">
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
