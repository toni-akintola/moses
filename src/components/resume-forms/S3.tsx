"use client";
import { experienceCounter, experiencesAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { ArrowLeft, MinusCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Experience } from "@/utils/types";
import { nanoid } from "@/utils/helpers";
export default function S3() {
  const [experiences, setExperiences] = useAtom(experiencesAtom);

  const addExperience = () => {
    const newExperiences = [
      ...experiences,
      {
        id: experiences.length + 1,
        employer: "",
        job: "",
        city: "",
        startDate: "",
        endDate: "",
        duties: "",
      },
    ];
    setExperiences(newExperiences);
  };

  const handleExperienceChange =
    (index: number) => (e: React.FormEvent<HTMLSelectElement>) => {
      console.log("index: " + index);
      console.log("property name: " + e.currentTarget.name);
      let newArr = [...experiences];
      const experience = experiences.find((exp) => exp.id === index);

      setExperiences(newArr);
    };

  return (
    <form className="border rounded-md m-6 py-12 px-6 border-gray-900/10 bg-indigo-500">
      <Link
        href="/s2"
        className="flex justify-center flex-row w-1/4 items-center text-indigo-500 bg-white rounded-md p-1 mb-2"
      >
        <ArrowLeft className="h-4 w-4 text-indigo-500" />
        Atrás
      </Link>
      {experiences.map((item) => (
        <div key={item.id}>
          <h2 className="text-base font-semibold leading-7 text-white">
            Experiencia #{item.id}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="employer"
                className="block text-sm font-medium leading-6 text-white"
              >  
                Empleador
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="employer"
                    id="employer"
                    autoComplete="employer"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                Título Profesional
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="job-title"
                    id="job-title"
                    autoComplete="job-title"
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
                Ciudad
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="city"
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
                Mes y año de inicio
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="start"
                    id="start"
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
                Mes y año de termino
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="end"
                    id="end"
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
                ¿Qué hiciste específicamente?
              </label>
              <div className="mt-2">
                <textarea
                  id="duties"
                  name="duties"
                  rows={3}
                  className="block w-full p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
                <p className="mt-3 text-sm leading-6 text-white">
                  Escribe 3-4 líneas sobre la experiencia.
                </p>
              </div>
            </div>
          </div>
          {experiences.length >= 2 && (
            <button
              type="button"
              className="text-white py-1 px-4 rounded-md flex flex-row items-center gap-x-3"
              onClick={() => {
                const newExperiences = [...experiences];
                newExperiences.pop();
                setExperiences(newExperiences);
              }}
            >
              <MinusCircle className="h-4 w-4" />
              Eliminar experiencia
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="text-white py-1 px-4 rounded-md flex flex-row items-center gap-x-3"
        onClick={addExperience}
      >
        <PlusCircle className="h-4 w-4" />
          Agregar experiencia
      </button>
      <div className="col-span-full">
        <div className="mt-2 flex items-center justify-center">
          <button
            type="button"
            className="bg-white text-indigo-500 py-2 px-4 rounded-md hover:bg-gray-200"
            onClick={() => {
              console.log(experiences);
            }}
          >
            Crear Currículum
          </button>
        </div>
      </div>
    </form>
  );
}
