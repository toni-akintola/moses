"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertTriangleIcon, Trash, Trash2Icon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

const educationSchema = z.object({
    school: z.string({ required_error: "Inválido." }),
    country: z.string({
        required_error: "Inválido.",
    }),
    city: z.string({
        required_error: "Inválido.",
    }),
    degree: z.string({ required_error: "Inválido." }).min(1, {
        message: "Invalido.",
    }),
    endYear: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: "End date should be in the format YYYY-MM-DD",
    }),
})

export const profileSchema = z.object({
    firstname: z
        .string()
        .min(3, { message: "Product Name must be at least 3 characters" }),
    lastname: z
        .string()
        .min(3, { message: "Product Name must be at least 3 characters" }),
    email: z
        .string()
        .email({ message: "Product Name must be at least 3 characters" }),
    contactno: z.coerce.number(),
    numberSlider: z.number(),
    educations: z.array(educationSchema),
    // jobs array is for the dynamic fields
    jobs: z.array(
        z.object({
            jobcountry: z
                .string()
                .min(1, { message: "Please select a category" }),
            jobcity: z.string().min(1, { message: "Please select a category" }),
            jobtitle: z.string().min(3, {
                message: "Product Name must be at least 3 characters",
            }),
            employer: z.string().min(3, {
                message: "Product Name must be at least 3 characters",
            }),
            startdate: z
                .string()
                .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
                    message: "Start date should be in the format YYYY-MM-DD",
                }),
            enddate: z
                .string()
                .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
                    message: "End date should be in the format YYYY-MM-DD",
                }),
            duties: z.string({
                required_error: "Inválido.",
            }),
        })
    ),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
interface ProfileFormType {
    initialData: any | null
    categories: any
}

export const CreateProfileOne: React.FC<ProfileFormType> = ({
    initialData,
    categories,
}) => {
    const params = useParams()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imgLoading, setImgLoading] = useState(false)
    const title = initialData ? "Edit information" : "Build your resume"
    const description = initialData
        ? "Edit your information."
        : "To create your resume, we first need some basic information about you."
    const toastMessage = initialData ? "Product updated." : "Product created."
    const action = initialData ? "Save changes" : "Create"
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [data, setData] = useState({})
    const delta = currentStep - previousStep

    const defaultValues = {
        numberSlider: 1,
        jobs: [
            {
                jobtitle: "",
                employer: "",
                startdate: "",
                enddate: "",
                jobcountry: "",
                jobcity: "",
                duties: "",
            },
        ],
        educations: [
            {
                school: "",
                degree: "",
                endYear: "",
                country: "",
                city: "",
            },
        ],
    }

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues,
        mode: "onChange",
    })

    const {
        control,
        formState: { errors },
    } = form

    const { append, remove, fields } = useFieldArray({
        control,
        name: "jobs",
    })

    const {
        append: educationsAppend,
        remove: educationsRemove,
        fields: educationsFields,
    } = useFieldArray({
        control,
        name: "educations",
    })

    function onSubmit(values: ProfileFormValues) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
            router.refresh()
            router.push(`/${params.storeId}/products`)
        } catch (error: any) {
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    const processForm: SubmitHandler<ProfileFormValues> = (data) => {
        console.log("data ==>", data)
        setData(data)
        // api call and reset
        // form.reset();
    }

    type FieldName = keyof ProfileFormValues

    const steps = [
        {
            id: "Step 1",
            name: "Personal Information",
            fields: [
                "firstname",
                "lastname",
                "email",
                "contactno",
                "numberSlider",
                "country",
                "city",
            ],
        },
        {
            id: "Step 2",
            name: "Educational Information",
            fields: fields
                ?.map((_, index) => [
                    `educations.${index}.school`,
                    `educations.${index}.city`,
                    `educations.${index}.country`,
                    `educations.${index}.degree`,
                    `educations.${index}.enddate`,
                ])
                .flat(),
        },
        {
            id: "Step 3",
            name: "Professional Information",
            // fields are mapping and flattening for the error to be trigger  for the dynamic fields
            fields: fields
                ?.map((_, index) => [
                    `jobs.${index}.jobtitle`,
                    `jobs.${index}.employer`,
                    `jobs.${index}.startdate`,
                    `jobs.${index}.enddate`,
                    `jobs.${index}.jobcountry`,
                    `jobs.${index}.jobcity`,
                    `jobs.${index}.duties`,
                    // Add other field names as needed
                ])
                .flat(),
        },
        { id: "Step 4", name: "Complete" },
    ]

    const next = async () => {
        const fields = steps[currentStep].fields

        const output = await form.trigger(fields as FieldName[], {
            shouldFocus: true,
        })

        if (!output) return

        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 2) {
                await form.handleSubmit(processForm)()
            }
            setPreviousStep(currentStep)
            setCurrentStep((step) => step + 1)
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep)
            setCurrentStep((step) => step - 1)
        }
    }

    const countries = [{ id: "wow", name: "india" }]
    const cities = [{ id: "2", name: "kerala" }]

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <div>
                <ul className="flex gap-4">
                    {steps.map((step, index) => (
                        <li key={step.name} className="md:flex-1">
                            {currentStep > index ? (
                                <div className="group flex w-full flex-col border-l-4 border-laserBlue py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                                    <span className="text-sm font-medium text-laserBlue transition-colors ">
                                        {step.id}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {step.name}
                                    </span>
                                </div>
                            ) : currentStep === index ? (
                                <div
                                    className="flex w-full flex-col border-l-4 border-laserBlue py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                                    aria-current="step"
                                >
                                    <span className="text-sm font-medium text-laserBlue">
                                        {step.id}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {step.name}
                                    </span>
                                </div>
                            ) : (
                                <div className="group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                                    <span className="text-sm font-medium text-gray-500 transition-colors">
                                        {step.id}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {step.name}
                                    </span>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    <div
                        className={cn(
                            currentStep === 1 || currentStep === 2
                                ? "w-full md:inline-block"
                                : "gap-8 md:grid md:grid-cols-3"
                        )}
                    >
                        {currentStep === 0 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder="John"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder="Doe"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder="johndoe@gmail.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="contactno"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Contact Number
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter you contact number"
                                                    disabled={loading}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="numberSlider"
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <FormItem className="flex-col items-center h-full justify-end">
                                            <FormLabel className="text-black">
                                                {/* {props.proficiency.title} */}
                                                English Proficiency
                                            </FormLabel>
                                            <FormControl>
                                                <Slider
                                                    className=""
                                                    max={5}
                                                    step={1}
                                                    defaultValue={[value]}
                                                    onValueChange={(vals) => {
                                                        onChange(vals[0])
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-black"></FormDescription>
                                            <div className="flex justify-between flex-row">
                                                <p className="text-black text-sm">
                                                    {/* {props.proficiency.one} */}{" "}
                                                    One
                                                </p>
                                                <p className="text-black text-sm">
                                                    {/* {props.proficiency.five} */}{" "}
                                                    Five
                                                </p>
                                            </div>
                                            <p className="text-black text-sm">
                                                {/* {props.proficiency.subtitle} */}
                                            </p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {currentStep === 1 && (
                            <>
                                {educationsFields?.map((field, index) => (
                                    <Accordion
                                        type="single"
                                        collapsible
                                        defaultValue="item-1"
                                        key={field.id}
                                    >
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger
                                                className={cn(
                                                    "relative !no-underline [&[data-state=closed]>button]:hidden [&[data-state=open]>.alert]:hidden",
                                                    errors?.jobs?.[index] &&
                                                        "text-red-700"
                                                )}
                                            >
                                                {`Education ${index + 1}`}

                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="absolute right-8"
                                                    onClick={() =>
                                                        educationsRemove(index)
                                                    }
                                                >
                                                    <Trash2Icon className="h-4 w-4 " />
                                                </Button>
                                                {errors?.jobs?.[index] && (
                                                    <span className="alert absolute right-8">
                                                        <AlertTriangleIcon className="h-4 w-4   text-red-700" />
                                                    </span>
                                                )}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div
                                                    className={cn(
                                                        "relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3"
                                                    )}
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name={`educations.${index}.school`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    School
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="text"
                                                                        disabled={
                                                                            loading
                                                                        }
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`educations.${index}.city`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    City
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="text"
                                                                        disabled={
                                                                            loading
                                                                        }
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`educations.${index}.country`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Country
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="text"
                                                                        disabled={
                                                                            loading
                                                                        }
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name={`educations.${index}.endYear`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    End date
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="date"
                                                                        disabled={
                                                                            loading
                                                                        }
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name={`educations.${index}.degree`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-white">
                                                                    {/* {props.education.degree.title} */}{" "}
                                                                    Degree
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Select
                                                                        onValueChange={
                                                                            field.onChange
                                                                        }
                                                                        defaultValue={
                                                                            field.value
                                                                        }
                                                                    >
                                                                        <SelectTrigger className="w-full">
                                                                            <SelectValue
                                                                                placeholder={
                                                                                    "Degree"
                                                                                }
                                                                            />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectLabel></SelectLabel>
                                                                                <SelectItem value="None">
                                                                                    {/* {
                                                                    props
                                                                        .placeholders
                                                                        .none
                                                                } */}
                                                                                </SelectItem>
                                                                                <SelectItem value="High School Diploma">
                                                                                    {/* {
                                                                    props
                                                                        .placeholders
                                                                        .diploma
                                                                } */}
                                                                                </SelectItem>
                                                                                <SelectItem value="GED">
                                                                                    {/* {
                                                                    props
                                                                        .placeholders
                                                                        .ged
                                                                } */}
                                                                                </SelectItem>
                                                                                <SelectItem value="Bachelor's Degree">
                                                                                    {/* {
                                                                    props
                                                                        .placeholders
                                                                        .bachelors
                                                                } */}
                                                                                </SelectItem>
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormDescription className="text-white">
                                                                    {/* {
                                                    props.education.degree
                                                        .subtitle
                                                } */}
                                                                </FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ))}

                                <div className="mt-4 flex justify-center">
                                    <Button
                                        type="button"
                                        className="flex justify-center bg-laserBlue"
                                        size={"lg"}
                                        onClick={() =>
                                            educationsAppend({
                                                school: "",
                                                degree: "",
                                                endYear: "",
                                                country: "",
                                                city: "",
                                            })
                                        }
                                    >
                                        Add More
                                    </Button>
                                </div>
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                {fields?.map((field, index) => (
                                    <Accordion
                                        type="single"
                                        collapsible
                                        defaultValue="item-1"
                                        key={field.id}
                                    >
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger
                                                className={cn(
                                                    "relative !no-underline [&[data-state=closed]>button]:hidden [&[data-state=open]>.alert]:hidden",
                                                    errors?.jobs?.[index] &&
                                                        "text-red-700"
                                                )}
                                            >
                                                {`Work Experience ${index + 1}`}

                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="absolute right-8"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    <Trash2Icon className="h-4 w-4 " />
                                                </Button>
                                                {errors?.jobs?.[index] && (
                                                    <span className="alert absolute right-8">
                                                        <AlertTriangleIcon className="h-4 w-4   text-red-700" />
                                                    </span>
                                                )}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div
                                                    className={cn(
                                                        "relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3"
                                                    )}
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name={`jobs.${index}.jobtitle`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Job title
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="text"
                                                                        disabled={
                                                                            loading
                                                                        }
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`jobs.${index}.employer`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Employer
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="text"
                                                                        disabled={
                                                                            loading
                                                                        }
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`jobs.${index}.startdate`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Start date
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="date"
                                                                        disabled={
                                                                            loading
                                                                        }
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`jobs.${index}.enddate`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    End date
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="date"
                                                                        disabled={
                                                                            loading
                                                                        }
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`jobs.${index}.jobcountry`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Job country
                                                                </FormLabel>
                                                                <Select
                                                                    disabled={
                                                                        loading
                                                                    }
                                                                    onValueChange={
                                                                        field.onChange
                                                                    }
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    defaultValue={
                                                                        field.value
                                                                    }
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue
                                                                                defaultValue={
                                                                                    field.value
                                                                                }
                                                                                placeholder="Select your job country"
                                                                            />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {countries.map(
                                                                            (
                                                                                country
                                                                            ) => (
                                                                                <SelectItem
                                                                                    key={
                                                                                        country.id
                                                                                    }
                                                                                    value={
                                                                                        country.id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        country.name
                                                                                    }
                                                                                </SelectItem>
                                                                            )
                                                                        )}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`jobs.${index}.jobcity`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Job city
                                                                </FormLabel>
                                                                <Select
                                                                    disabled={
                                                                        loading
                                                                    }
                                                                    onValueChange={
                                                                        field.onChange
                                                                    }
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    defaultValue={
                                                                        field.value
                                                                    }
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue
                                                                                defaultValue={
                                                                                    field.value
                                                                                }
                                                                                placeholder="Select your job city"
                                                                            />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {cities.map(
                                                                            (
                                                                                city
                                                                            ) => (
                                                                                <SelectItem
                                                                                    key={
                                                                                        city.id
                                                                                    }
                                                                                    value={
                                                                                        city.id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        city.name
                                                                                    }
                                                                                </SelectItem>
                                                                            )
                                                                        )}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <FormField
                                                    control={form.control}
                                                    name={`jobs.${index}.duties`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-white">
                                                                {/* {props.duties.title} */}
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder={
                                                                        "Duties"
                                                                    }
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription className="text-white">
                                                                {/* {props.duties.subtitle} */}
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ))}

                                <div className="mt-4 flex justify-center">
                                    <Button
                                        type="button"
                                        className="flex justify-center bg-laserBlue"
                                        size={"lg"}
                                        onClick={() =>
                                            append({
                                                jobtitle: "",
                                                employer: "",
                                                startdate: "",
                                                enddate: "",
                                                jobcountry: "",
                                                jobcity: "",
                                                duties: "",
                                            })
                                        }
                                    >
                                        Add More
                                    </Button>
                                </div>
                            </>
                        )}
                        {currentStep === 3 && (
                            <div>
                                <h1>Completed</h1>
                                <pre className="whitespace-pre-wrap">
                                    {JSON.stringify(data)}
                                </pre>
                                <Button
                                    disabled={loading}
                                    className="ml-auto"
                                    type="submit"
                                >
                                    {action}
                                </Button>
                            </div>
                        )}
                    </div>
                </form>
            </Form>
            {/* Navigation */}
            <div className="mt-8 pt-5">
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={prev}
                        disabled={currentStep === 0}
                        className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
                        className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}
