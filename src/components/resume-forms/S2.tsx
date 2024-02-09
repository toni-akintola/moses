"use client"
import {
    degreeAtom,
    nationAtom,
    universityAtom,
    yearsAtom,
} from "@/utils/atoms"
import { useAtom } from "jotai"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const countryOptions = {
    US: { id: 1, name: "US" },
    Venezuela: { id: 2, name: "Venezuela" },
    Mexico: { id: 3, name: "Mexico" },
}

export default function S2() {
    const [university, setUniversity] = useAtom(universityAtom)
    const [degree, setDegree] = useAtom(degreeAtom)
    const [years, setYears] = useAtom(yearsAtom)
    const [nation, setNation] = useAtom(nationAtom)

    const handleEducationChange = (e: React.FormEvent<HTMLInputElement>) => {
        setUniversity(e.currentTarget.value)
    }

    const handleDegreeChange = (e: React.FormEvent<HTMLInputElement>) => {
        setDegree(e.currentTarget.value)
    }

    const handleYearsChange = (e: React.FormEvent<HTMLInputElement>) => {
        setYears(e.currentTarget.value)
    }

    const handleNationChange = (e: React.FormEvent<HTMLSelectElement>) => {
        setNation(e.currentTarget.value)
    }

    const handleClick = () => {
        console.log(university, years, degree, nation)
    }

    return (
        <div className="border rounded-md m-6 py-12 px-6 border-gray-900/10 bg-indigo-500">
            <Link
                href="/s1"
                className="flex flex-row w-1/5 items-center justify-center text-indigo-500 bg-white rounded-md p-1 mb-2"
            >
                <ArrowLeft className="h-4 w-4 text-indigo-500" />
                Atrás
            </Link>
            <h2 className="text-base font-semibold leading-7 text-white">
                Educación
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                    <label
                        htmlFor="university"
                        className="block text-sm font-medium leading-6 text-white"
                    >
                        Universidad
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                name="university"
                                id="university"
                                autoComplete="university"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                onChange={handleEducationChange}
                                placeholder="Universidad de Caracas"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-4">
                    <label
                        htmlFor="degree"
                        className="block text-sm font-medium leading-6 text-white"
                    >
                        Grado y Concentración
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                name="degree"
                                id="degree"
                                autoComplete="degree"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                onChange={handleDegreeChange}
                                placeholder="B.A. in Economics"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-4">
                    <label
                        htmlFor="years-attended"
                        className="block text-sm font-medium leading-6 text-white"
                    >
                        Años de estudio
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="number"
                                name="years-attended"
                                id="years-attended"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                onChange={handleYearsChange}
                                placeholder="4"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-white"
                    >
                        País
                    </label>
                    <div className="mt-2">
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            onChange={handleNationChange}
                        >
                            <option>United States</option>
                            <option>Venezuela</option>
                            <option>Mexico</option>
                        </select>
                    </div>
                </div>

                <div className="col-span-full">
                    <div className="mt-2 flex items-center justify-center">
                        <Link
                            className="bg-white text-indigo-500 py-2 px-4 rounded-md hover:bg-gray-200"
                            href="/s3"
                        >
                            Próximo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
