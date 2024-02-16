"use client"

import {
    ageAtom,
    emailAtom,
    nameAtom,
    numberAtom,
    proficiencyAtom,
} from "@/utils/atoms"
import { useAtom } from "jotai"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function S1() {
    const [fullName, setFullName] = useAtom(nameAtom)
    const [age, setAge] = useAtom(ageAtom)
    const [proficiency, setProficiency] = useAtom(proficiencyAtom)
    const [number, setNumber] = useAtom(numberAtom)
    const [email, setEmail] = useAtom(emailAtom)
    const router = useRouter()
    const handleAgeChange = (e: React.FormEvent<HTMLInputElement>) => {
        setAge(e.currentTarget.value)
    }

    const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setFullName(e.currentTarget.value)
    }

    const handleNumberChange = (e: React.FormEvent<HTMLInputElement>) => {
        setNumber(e.currentTarget.value)
    }

    const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const handleProficiencyChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProficiency(e.currentTarget.id)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push("/s2")
    }

    return (
        <div className="border rounded-md m-6 py-12 px-6 border-gray-900/10 bg-indigo-500">
            <Link
                href="/"
                className="flex flex-row w-1/4 items-center justify-center text-indigo-500 bg-white rounded-md p-1 mb-2"
            >
                <ArrowLeft className="h-4 w-4 text-indigo-500" />
                Inicio
            </Link>
            <h2 className="text-base font-semibold leading-7 text-white">
                Información General
            </h2>
            {/* <p className="mt-1 text-sm leading-6 text-white">
            This information will be displayed publicly so be careful what you share.
          </p> */}
            <form
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                onSubmit={handleSubmit}
            >
                <div className="sm:col-span-4">
                    <label
                        htmlFor="full-name"
                        className="block text-sm font-medium leading-6 text-white"
                    >
                        Nombre completo
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
                                placeholder="Miguel de Cervantes"
                                required
                                value={fullName}
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-4">
                    <label
                        htmlFor="age"
                        className="block text-sm font-medium leading-6 text-white"
                    >
                        Edad
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
                                required
                                value={age}
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-4">
                    <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium leading-6 text-white"
                    >
                        Teléfono (si lo tienes)
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                onChange={handleNumberChange}
                                name="phoneNumber"
                                id="phoneNumber"
                                autoComplete="phoneNumber"
                                className="block flex-1 border-0 bg-transparent py-1.5 px-2 [&::-webkit-inner-spin-button]:appearance-none text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="877-241-9890"
                                required
                                value={number}
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-white"
                    >
                        Correo electrónico (si lo tienes)
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                onChange={handleEmailChange}
                                name="email"
                                id="email"
                                autoComplete="email"
                                className="block flex-1 border-0 bg-transparent py-1.5 px-2 [&::-webkit-inner-spin-button]:appearance-none text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="janesmith@gmail.com"
                                required
                                value={email}
                            />
                        </div>
                    </div>
                </div>
                <div className="border-b border-white pb-12">
                    <div className=" space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-white">
                                Nivel de inglés
                            </legend>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="none"
                                        name="proficiency"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        required
                                        value={proficiency}
                                        onChange={handleProficiencyChange}
                                    />
                                    <label
                                        htmlFor="none"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Ninguno
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="basic"
                                        name="proficiency"
                                        type="radio"
                                        onChange={handleProficiencyChange}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        value={proficiency}
                                    />
                                    <label
                                        htmlFor="basic"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Básico
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="intermediate"
                                        name="proficiency"
                                        type="radio"
                                        onChange={handleProficiencyChange}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        value={proficiency}
                                    />
                                    <label
                                        htmlFor="intermediate"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Intermedio
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="advanced"
                                        name="proficiency"
                                        type="radio"
                                        onChange={handleProficiencyChange}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        value={proficiency}
                                    />
                                    <label
                                        htmlFor="advanced"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Avanzado
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="conversational"
                                        name="proficiency"
                                        type="radio"
                                        onChange={handleProficiencyChange}
                                        value={proficiency}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label
                                        htmlFor="conversational"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >                                  
                                        Conversacional
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="col-span-full">
                    <div className="mt-2 flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-white text-indigo-500 py-2 px-4 rounded-md hover:bg-gray-200"
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
