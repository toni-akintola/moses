"use client"
import { Checkbox } from "@/components/ui/checkbox"
import {
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormDescription,
    Form,
} from "@/components/ui/form"
import { educationsAtom, translateAtom } from "@/utils/atoms"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom, useSetAtom } from "jotai"
import { ArrowLeft, MinusCircle, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const countryOptions = {
    US: { id: 1, name: "US" },
    Venezuela: { id: 2, name: "Venezuela" },
    Mexico: { id: 3, name: "Mexico" },
}

export default function S2() {
    const [educations, setEducations] = useAtom(educationsAtom)
    const submitHandler = useSetAtom(translateAtom)
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push("/s3")
    }

    const FormSchema = z.object({
        mobile: z.boolean().default(false).optional(),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            mobile: true,
        },
    })

    const addEducation = () => {
        const newEducations = [
            ...educations,
            {
                id: educations.length + 1,
                school: "",
                degree: "",
                concentration: "",
                startDate: "",
                endDate: "",
                nation: "",
                graduationStatus: false,
            },
        ]
        setEducations(newEducations)
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
            <Form {...form}>
                <form
                    className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                    onSubmit={handleSubmit}
                >
                    {educations.map((education) => (
                        <div
                            key={education.id}
                            className="gap-y-8 flex flex-col"
                        >
                            <h2 className="text-base font-semibold leading-7 text-white">
                                Educación #{education.id}
                            </h2>
                            <div className="sm:col-span-4 gap-y-8 ">
                                <label
                                    htmlFor="school"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Escuela/Universidad
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="school"
                                            id="school"
                                            autoComplete="school"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            required
                                            onChange={(
                                                e: React.FormEvent<HTMLInputElement>
                                            ) => {
                                                setEducations((prevArr) => {
                                                    const result = [...prevArr]
                                                    result[
                                                        education.id - 1
                                                    ].school =
                                                        e.currentTarget.value
                                                    return result
                                                })
                                            }}
                                            value={education.school}
                                            placeholder="Universidad de Caracas"
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
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="nation"
                                            id="nation"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            required
                                            onChange={(
                                                e: React.FormEvent<HTMLInputElement>
                                            ) => {
                                                setEducations((prevArr) => {
                                                    const result = [...prevArr]
                                                    result[
                                                        education.id - 1
                                                    ].nation =
                                                        e.currentTarget.value
                                                    return result
                                                })
                                            }}
                                            value={education.nation}
                                            placeholder="Venezuela"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="degree"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Grado
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="degree"
                                            id="degree"
                                            autoComplete="degree"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            required
                                            onChange={(
                                                e: React.FormEvent<HTMLInputElement>
                                            ) => {
                                                setEducations((prevArr) => {
                                                    const result = [...prevArr]
                                                    result[
                                                        education.id - 1
                                                    ].degree =
                                                        e.currentTarget.value
                                                    return result
                                                })
                                            }}
                                            value={education.degree}
                                            placeholder="Licenciatura en Economía"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="degree"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Concentración
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="concentration"
                                            id="concentration"
                                            autoComplete="concentration"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            required
                                            onChange={(
                                                e: React.FormEvent<HTMLInputElement>
                                            ) => {
                                                setEducations((prevArr) => {
                                                    const result = [...prevArr]
                                                    result[
                                                        education.id - 1
                                                    ].degree =
                                                        e.currentTarget.value
                                                    return result
                                                })
                                            }}
                                            value={education.degree}
                                            placeholder="Licenciatura en Economía"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="year-started"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Año de inicio
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="start-date"
                                            id="start-date"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            required
                                            onChange={(
                                                e: React.FormEvent<HTMLInputElement>
                                            ) => {
                                                setEducations((prevArr) => {
                                                    const result = [...prevArr]
                                                    result[
                                                        education.id - 1
                                                    ].startDate =
                                                        e.currentTarget.value
                                                    return result
                                                })
                                            }}
                                            value={education.startDate}
                                            placeholder="2024"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="country"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Año de termino
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="endDate"
                                                id="endDate"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                required
                                                onChange={(
                                                    e: React.FormEvent<HTMLInputElement>
                                                ) => {
                                                    setEducations((prevArr) => {
                                                        const result = [
                                                            ...prevArr,
                                                        ]
                                                        result[
                                                            education.id - 1
                                                        ].endDate =
                                                            e.currentTarget.value
                                                        return result
                                                    })
                                                }}
                                                value={education.endDate}
                                                placeholder="2024"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="mobile"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="data-[state=checked]:bg-white data-[state=checked]:text-indigo-500 border-white"
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-white">
                                                ¿Completaste?
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}
                    <div>
                        {educations.length >= 2 && (
                            <button
                                type="button"
                                className="text-white py-1 px-4 rounded-md flex flex-row items-center gap-x-3"
                                onClick={() => {
                                    const newExperiences = [...educations]
                                    newExperiences.pop()
                                    setEducations(newExperiences)
                                }}
                            >
                                <MinusCircle className="h-4 w-4" />
                                Eliminar educación
                            </button>
                        )}
                        <button
                            type="button"
                            className="text-white py-1 px-4 rounded-md flex flex-row items-center gap-x-3"
                            onClick={addEducation}
                        >
                            <PlusCircle className="h-4 w-4" />
                            Agregar educación
                        </button>
                    </div>
                    <div className="col-span-full">
                        <div className="mt-2 flex items-center justify-center">
                            <button
                                className="bg-white text-indigo-500 py-2 px-4 rounded-md hover:bg-gray-200"
                                type="submit"
                            >
                                Próximo
                            </button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
