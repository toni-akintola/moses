"use client";
import {
  cityAtom,
  dutiesAtom,
  employerAtom,
  endDateAtom,
  experienceCounter,
  jobAtom,
  startDateAtom,
} from "@/utils/atoms";
import { useAtom } from "jotai";

export default function S3() {
  const [experiences, setExperiences] = useAtom(experienceCounter);
  const [employer, setEmployer] = useAtom(employerAtom);
  const [job, setJob] = useAtom(jobAtom);
  const [city, setCity] = useAtom(cityAtom);
  const [startDate, setStartDate] = useAtom(startDateAtom);
  const [endDate, setEndDate] = useAtom(endDateAtom);
  const [duties, setDuties] = useAtom(dutiesAtom);

  const handleEmployerChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmployer(e.currentTarget.value);
  };

  const handleJobChange = (e: React.FormEvent<HTMLInputElement>) => {
    setJob(e.currentTarget.value);
  };

  const handleCityChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  const handleStartDateChange = (e: React.FormEvent<HTMLInputElement>) => {
    setStartDate(e.currentTarget.value);
  };

  const handleEndDateChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEndDate(e.currentTarget.value);
  };

  const handleDutiesChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setDuties(e.currentTarget.value);
  };

  const submitHandler = () => {
    console.log({ employer, job, city, startDate, endDate, duties });
  };
  return (
    <form className="border rounded-md m-6 py-12 px-6 border-gray-900/10 bg-indigo-500">
      {experiences.map((item) => (
        <div key={item}>
          <h2 className="text-base font-semibold leading-7 text-white">
            Experience #{item}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="employer"
                className="block text-sm font-medium leading-6 text-white"
              >
                Employer
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="employer"
                    id="employer"
                    autoComplete="employer"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    onChange={handleEmployerChange}
                    placeholder="Department of Education"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="job-title"
                className="block text-sm font-medium leading-6 text-white"
              >
                Job Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="job-title"
                    id="job-title"
                    autoComplete="job-title"
                    onChange={handleJobChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Assistant Manager"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-white"
              >
                City
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="city"
                    onChange={handleCityChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Caracas"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="start"
                className="block text-sm font-medium leading-6 text-white"
              >
                Start Month and Year
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="start"
                    id="start"
                    onChange={handleStartDateChange}
                    autoComplete="start"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="January 2024"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="end"
                className="block text-sm font-medium leading-6 text-white"
              >
                End Month and Year
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="end"
                    id="end"
                    onChange={handleEndDateChange}
                    autoComplete="end"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="January 2024"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="duties"
                className="block text-sm font-medium leading-6 text-white"
              >
                Duties
              </label>
              <div className="mt-2">
                <textarea
                  id="duties"
                  name="duties"
                  rows={3}
                  className="block w-full p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleDutiesChange}
                  defaultValue={""}
                />
                <p className="mt-3 text-sm leading-6 text-white">
                  Write 3-4 lines about the experience.
                </p>
              </div>
            </div>
          </div>
          {experiences.length >= 2 && (
            <button
              onClick={() => {
                const newExperiences = [...experiences];
                newExperiences.pop();
                setExperiences(newExperiences);
              }}
            >
              Remove Experience
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() => {
          const newExperiences = [...experiences];
          newExperiences.push(newExperiences.length + 1);
          setExperiences(newExperiences);
        }}
      >
        Add Experience
      </button>

      <div className="col-span-full">
        <div className="mt-2 flex items-center justify-center">
          <button
            type="button"
            onClick={submitHandler}
            className="bg-white text-indigo-500 py-2 px-4 rounded-md hover:bg-gray-200"
          >
            Create Resume
          </button>
        </div>
      </div>
    </form>
  );
}
