"use client"
import { S1Props } from "@/components/resume-forms/S1"
import { S2Props } from "@/components/resume-forms/S2"
import { S3Props } from "@/components/resume-forms/S3"
import { S4Props } from "@/components/resume-forms/S4"
import { S5Props } from "@/components/resume-forms/S5"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { MultiStepLoader } from "@/components/ui/multi-step-loader"
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
import { cn, download } from "@/lib/utils"
import { BodyPayload, FormItemText, ResumeSubmission } from "@/utils/types"
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

const skillsSchema = z.object({
    title: z.string({
        required_error: "Inválido.",
    }),
})

const certificateSchema = z.object({
    title: z.string({
        required_error: "Inválido.",
    }),
})

export const profileSchema = z.object({
    firstName: z
        .string()
        .min(3, { message: "Product Name must be at least 3 characters" }),
    lastName: z
        .string()
        .min(3, { message: "Product Name must be at least 3 characters" }),
    age: z.string().min(1, {
        message: "Inválido.",
    }),
    email: z
        .string()
        .email({ message: "Product Name must be at least 3 characters" }),
    phoneNumber: z.coerce.number(),
    numberSlider: z.number(),
    educations: z.array(educationSchema),
    // experiences array is for the dynamic fields
    experiences: z.array(
        z.object({
            country: z.string().min(1, { message: "Please select a category" }),
            city: z.string().min(1, { message: "Please select a category" }),
            jobTitle: z.string().min(3, {
                message: "Product Name must be at least 3 characters",
            }),
            employer: z.string().min(3, {
                message: "Product Name must be at least 3 characters",
            }),
            startDate: z
                .string()
                .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
                    message: "Start date should be in the format YYYY-MM-DD",
                }),
            endDate: z
                .string()
                .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
                    message: "End date should be in the format YYYY-MM-DD",
                }),
            duties: z.string({
                required_error: "Inválido.",
            }),
        })
    ),
    skills: z.array(skillsSchema),
    certificates: z.array(certificateSchema),
    authorizationStatus: z.boolean({
        required_error: "Must specify.",
    }),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
interface ProfileFormType {
    initialData: any | null
    categories: any
    S1Props: S1Props
    S2Props: S2Props
    S3Props: S3Props
    S4Props: S4Props
    S5Props: S5Props
}

export const CreateProfileOne: React.FC<ProfileFormType> = ({
    initialData,
    categories,
    S1Props: s1Content,
    S2Props: s2Content,
    S3Props: s3Content,
    S4Props: s4Content,
    S5Props: s5Content,
}) => {
    const loadingStates = [
        {
            text: "Compiling responses",
        },
        {
            text: "Translating responses",
        },
        {
            text: "Filling resume",
        },
        {
            text: "Formatting resume",
        },
        {
            text: "Preparing download",
        },
        {
            text: "Download complete",
        },
    ]

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [downloadState, setDownloadState] = useState(false)
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
        experiences: [
            {
                jobTitle: "",
                employer: "",
                startDate: "",
                endDate: "",
                country: "",
                city: "",
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
        skills: [
            {
                title: "",
            },
        ],
        certificates: [
            {
                title: "",
            },
        ],
        authorizationStatus: false,
    }
    const englishProficiency = new Map<number, string>([
        [1, "ILR Level 0"],
        [2, "ILR Level 1"],
        [3, "ILR Level 2"],
        [4, "ILR Level 3"],
        [5, "ILR Level 4"],
    ])
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues,
        mode: "onChange",
    })

    const {
        control,
        formState: { errors },
    } = form

    const {
        append: experiencesAppend,
        remove: experiencesRemove,
        fields: experiencesFields,
    } = useFieldArray({
        control,
        name: "experiences",
    })

    const {
        append: educationsAppend,
        remove: educationsRemove,
        fields: educationsFields,
    } = useFieldArray({
        control,
        name: "educations",
    })

    const {
        append: skillsAppend,
        remove: skillsRemove,
        fields: skillsFields,
    } = useFieldArray({
        control,
        name: "skills",
    })

    const {
        append: certificatesAppend,
        remove: certificatesRemove,
        fields: certificatesFields,
    } = useFieldArray({
        control,
        name: "certificates",
    })

    async function onSubmit(values: ProfileFormValues) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setDownloadState(true)
        console.log(values)
        const proficiency = englishProficiency.get(
            values.numberSlider
        ) as string
        try {
            const response = await fetch("/api/translate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    age: values.age,
                    name: values.firstName + " " + values.lastName,
                    number: values.phoneNumber,
                    email: values.email,
                    proficiency: proficiency,
                    educations: values.educations,
                    experiences: values.experiences,
                    skills: values.skills,
                    certificates: values.certificates,
                    authorizationStatus: values.authorizationStatus,
                }),
            })
            const data: ResumeSubmission = await response.json()
            const template = { html: htmlTemplate, data: data }
            const payload: BodyPayload = { output: "pdf", template: template }
            console.log(payload)
            await download(payload)
            console.log("downloaded")
            return data
        } catch (error) {
            console.log(error)
            setDownloadState(false)
        } finally {
            setDownloadState(false)
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
            fields: educationsFields
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
            fields: experiencesFields
                ?.map((_, index) => [
                    `experiences.${index}.jobTitle`,
                    `experiences.${index}.employer`,
                    `experiences.${index}.startDate`,
                    `experiences.${index}.endDate`,
                    `experiences.${index}.country`,
                    `experiences.${index}.city`,
                    `experiences.${index}.duties`,
                    // Add other field names as needed
                ])
                .flat(),
        },
        {
            id: "Step 4",
            name: "Skills",
            fields: skillsFields
                ?.map((_, index) => [`skills.${index}.title`])
                .flat(),
        },
        {
            id: "Step 5",
            name: "Certificates",
            // fields are mapping and flattening for the error to be trigger  for the dynamic fields
            fields: certificatesFields
                ?.map((_, index) => [`certificates.${index}.title`])
                .flat(),
        },
        { id: "Step 6", name: "Complete" },
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
                <ul className="gap-4 grid md:flex">
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
                    <MultiStepLoader
                        loadingStates={loadingStates}
                        loading={downloadState}
                        duration={2000}
                    />

                    <div
                        className={cn(
                            currentStep === 1 ||
                                currentStep === 2 ||
                                currentStep === 3 ||
                                currentStep === 4
                                ? "w-full md:inline-block"
                                : "gap-8 md:grid md:grid-cols-3"
                        )}
                    >
                        {currentStep === 0 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {s1Content.name.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder={
                                                        s1Content.name
                                                            .placeholder
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
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {s1Content.name.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder={
                                                        s1Content.name
                                                            .placeholder
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
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {s1Content.age.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder={
                                                        s1Content.age
                                                            .placeholder
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {s1Content.email.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder={
                                                        s1Content.email
                                                            .placeholder
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
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {s1Content.phoneNumber.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder={
                                                        s1Content.phoneNumber
                                                            .placeholder
                                                    }
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
                                        <FormItem className="flex-col items-center h-full justify-end p-3">
                                            <FormLabel className="text-black">
                                                {s1Content.proficiency.title}
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
                                                    {s1Content.proficiency.one}{" "}
                                                </p>
                                                <p className="text-black text-sm">
                                                    {s1Content.proficiency.five}{" "}
                                                </p>
                                            </div>
                                            {/* <p className="text-black text-sm">
                                                {s1Content.proficiency.subtitle}
                                            </p> */}
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
                                                    errors?.experiences?.[
                                                        index
                                                    ] && "text-red-700"
                                                )}
                                            >
                                                {`Education ${index + 1}`}
                                                {educationsFields.length >
                                                    1 && (
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="absolute right-8"
                                                        onClick={() =>
                                                            educationsRemove(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <Trash2Icon className="h-4 w-4 " />
                                                    </Button>
                                                )}
                                                {errors?.experiences?.[
                                                    index
                                                ] && (
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
                                                                    {
                                                                        s2Content
                                                                            .education
                                                                            .city
                                                                            .title
                                                                    }
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
                                                                    {
                                                                        s2Content
                                                                            .education
                                                                            .country
                                                                            .title
                                                                    }
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
                                                                    {
                                                                        s2Content
                                                                            .education
                                                                            .endYear
                                                                            .title
                                                                    }
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
                                                                    {
                                                                        s2Content
                                                                            .education
                                                                            .degree
                                                                            .title
                                                                    }{" "}
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
                                                                                    s2Content
                                                                                        .education
                                                                                        .degree
                                                                                        .placeholder
                                                                                }
                                                                            />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectLabel></SelectLabel>
                                                                                <SelectItem value="None">
                                                                                    {
                                                                                        s2Content
                                                                                            .placeholders
                                                                                            .none
                                                                                    }
                                                                                </SelectItem>
                                                                                <SelectItem value="High School Diploma">
                                                                                    {
                                                                                        s2Content
                                                                                            .placeholders
                                                                                            .diploma
                                                                                    }
                                                                                </SelectItem>
                                                                                <SelectItem value="GED">
                                                                                    {
                                                                                        s2Content
                                                                                            .placeholders
                                                                                            .ged
                                                                                    }
                                                                                </SelectItem>
                                                                                <SelectItem value="Bachelor's Degree">
                                                                                    {
                                                                                        s2Content
                                                                                            .placeholders
                                                                                            .bachelors
                                                                                    }
                                                                                </SelectItem>
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormDescription className="text-white">
                                                                    {
                                                                        s2Content
                                                                            .education
                                                                            .degree
                                                                            .subtitle
                                                                    }
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
                                {experiencesFields?.map((field, index) => (
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
                                                    errors?.experiences?.[
                                                        index
                                                    ] && "text-red-700"
                                                )}
                                            >
                                                {`Work Experience ${index + 1}`}
                                                {experiencesFields.length >
                                                    1 && (
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="absolute right-8"
                                                        onClick={() =>
                                                            experiencesRemove(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <Trash2Icon className="h-4 w-4 " />
                                                    </Button>
                                                )}
                                                {errors?.experiences?.[
                                                    index
                                                ] && (
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
                                                        name={`experiences.${index}.jobTitle`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    {
                                                                        s3Content
                                                                            .jobTitle
                                                                            .title
                                                                    }
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
                                                        name={`experiences.${index}.employer`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    {
                                                                        s3Content
                                                                            .employer
                                                                            .title
                                                                    }
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
                                                        name={`experiences.${index}.startDate`}
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
                                                        name={`experiences.${index}.endDate`}
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
                                                        name={`experiences.${index}.country`}
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
                                                        name={`experiences.${index}.city`}
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
                                                    name={`experiences.${index}.duties`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-black">
                                                                {
                                                                    s3Content
                                                                        .duties
                                                                        .title
                                                                }
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder={
                                                                        s3Content
                                                                            .duties
                                                                            .placeholder
                                                                    }
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription className="text-black">
                                                                {
                                                                    s3Content
                                                                        .duties
                                                                        .subtitle
                                                                }
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
                                            experiencesAppend({
                                                jobTitle: "",
                                                employer: "",
                                                startDate: "",
                                                endDate: "",
                                                country: "",
                                                city: "",
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
                            <>
                                {skillsFields?.map((field, index) => (
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
                                                    errors?.experiences?.[
                                                        index
                                                    ] && "text-red-700"
                                                )}
                                            >
                                                {`${s4Content.heading} ${index + 1}`}
                                                {skillsFields.length > 1 && (
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="absolute right-8"
                                                        onClick={() =>
                                                            skillsRemove(index)
                                                        }
                                                    >
                                                        <Trash2Icon className="h-4 w-4 " />
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="absolute right-8"
                                                    onClick={() =>
                                                        skillsRemove(index)
                                                    }
                                                >
                                                    <Trash2Icon className="h-4 w-4 " />
                                                </Button>
                                                {errors?.experiences?.[
                                                    index
                                                ] && (
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
                                                        name={`skills.${index}.title`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    {
                                                                        s4Content.title
                                                                    }
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
                                                                                placeholder={
                                                                                    s4Content
                                                                                        .skills
                                                                                        .placeholder
                                                                                }
                                                                            />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectItem value="Driving">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .driving
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Vehicle Maintenance">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .vehicleMaintenance
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Construction">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .construction
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Plumbing">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .plumbing
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Welding">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .welding
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Equipment Operation">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .equipmentOperation
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Heavy Machinery Operation">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .heavyMachineryOperation
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Landscaping">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .landscaping
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Recycling">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .recycling
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Fishing">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .fishing
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Agricultural Work">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .agriculturalWork
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Mining">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .mining
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Manufacturing">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .manufacturing
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Mechanical Skills">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .mechanicalSkills
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Problem-solving Skills">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .problemSolvingSkills
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Technical Skills">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .technicalSkills
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Physical Strength and Endurance">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .physicalStrengthAndEndurance
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Safety Protocols Adherence">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .safetyProtocolsAdherence
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Teamwork and Collaboration">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .teamworkAndCollaboration
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Attention to Detail">
                                                                            {
                                                                                s4Content
                                                                                    .placeholders
                                                                                    .attentionToDetail
                                                                            }
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
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
                                            skillsAppend({
                                                title: "",
                                            })
                                        }
                                    >
                                        Add More
                                    </Button>
                                </div>
                            </>
                        )}
                        {currentStep === 4 && (
                            <>
                                {certificatesFields?.map((field, index) => (
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
                                                    errors?.experiences?.[
                                                        index
                                                    ] && "text-red-700"
                                                )}
                                            >
                                                {`${s5Content.heading} ${index + 1}`}
                                                {certificatesFields.length >
                                                    1 && (
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="absolute right-8"
                                                        onClick={() =>
                                                            skillsRemove(index)
                                                        }
                                                    >
                                                        <Trash2Icon className="h-4 w-4 " />
                                                    </Button>
                                                )}

                                                {errors?.experiences?.[
                                                    index
                                                ] && (
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
                                                        name={`certificates.${index}.title`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    {
                                                                        s5Content.title
                                                                    }
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
                                                                                placeholder={
                                                                                    s5Content
                                                                                        .certificates
                                                                                        .placeholder
                                                                                }
                                                                            />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectItem value="CDL (Commercial Driver's License)">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .cdlCommercialDriversLicense
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="ASE Certification (Automotive Service Excellence)">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .aseCertificationAutomotiveServiceExcellence
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="OSHA Certification (Occupational Safety and Health Administration)">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .oshaCertificationOccupationalSafetyAndHealthAdministration
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Welding Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .weldingCertification
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Forklift Operator Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .forkliftOperatorCertification
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Heavy Equipment Operator Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .heavyEquipmentOperatorCertification
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="CPR Certification (Cardiopulmonary Resuscitation)">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .cprCertificationCardiopulmonaryResuscitation
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="First Aid Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .firstAidCertification
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Confined Space Entry Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .confinedSpaceEntryCertification
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Scaffold Safety Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .scaffoldSafetyCertification
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Hazardous Materials Handling Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .hazardousMaterialsHandlingCertification
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Fishing Vessel Safety Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .fishingVesselSafetyCertification
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Agricultural Pesticide Applicator Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .agriculturalPesticideApplicatorCertification
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Mining Safety Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .miningSafetyCertification
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Construction Safety Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .constructionSafetyCertification
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Electrical Safety Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .electricalSafetyCertification
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Fire Safety Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .fireSafetyCertification
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Machine Guarding Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .machineGuardingCertification
                                                                            }
                                                                        </SelectItem>
                                                                        <SelectItem value="Fall Protection Certification">
                                                                            {
                                                                                s5Content
                                                                                    .placeholders
                                                                                    .fallProtectionCertification
                                                                            }
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="authorizationStatus"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={
                                                                            field.value
                                                                        }
                                                                        onCheckedChange={
                                                                            field.onChange
                                                                        }
                                                                        className="data-[state=checked]:bg-white data-[state=checked]:text-laserBlue border-white"
                                                                    />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel className="text-white">
                                                                        {
                                                                            s5Content.authorization
                                                                        }
                                                                    </FormLabel>
                                                                </div>
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
                                            certificatesAppend({
                                                title: "",
                                            })
                                        }
                                    >
                                        Add More
                                    </Button>
                                </div>
                            </>
                        )}
                        {currentStep === 5 && (
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

export const htmlTemplate = `<div class="h-full w-full flex p-2">
  <div class="flex">
    <div class="mt-16 grid border-2 border-gray-400 p-10">
      <div class="grid gap-8">
        <p class="text-2xl text-wrap font-semibold">{{name}}</p>
      </div>
      <div class="pt-5">
        <p class="text-2xl font-medium">Contact</p>
        <div class="grid gap-2 pt-4 text-sm font-light">
          <p>{{number}}</p>
          <p>{{email}}</p>
        </div>
      </div>
      <div class="flex flex-col gap-5 pt-5 pb-5">
        <p class="text-2xl font-medium">Skills</p>
        <div class="flex flex-col gap-2">
          <p class="text-xs">English Proficiency: {{proficiency}}</p>
          {{#each skills}}
          <p class="text-xs">{{title}}</p>
          {{/each}}
        </div>
      </div>
      <p class="text-2xl font-medium">Cerfificates</p>
      <div class="flex flex-col gap-5 pt-5">
        {{#each certificates}}
        <p class="text-xs">{{title}}</p>
        {{/each}}
      </div>
    </div>
    <div>
      <div class="pl-10 pt-10">
        <p class="text-2xl font-semibold">Education History</p>
        {{#each educations}}
        <div class="flex flex-row justify-between pt-4">
          <p class="text-sm font-light">{{degree}}</p>
          <p class="text-xs font-light">{{endYear}}</p>
        </div>
        <div>
          <p class="pt-1 font-medium">{{school}} | {{city}}, {{country}}</p>
        </div>
        {{/each}}
      </div>
      <div class="pl-10 pt-10">
        <p class="text-2xl font-semibold">Work Experience</p>
        {{#each experiences}}
        <div class="flex items-center justify-between pt-4">
          <p class="text-sm font-light">{{employer}}</p>
          <p class="text-xs font-light">{{startYear}} - {{endYear}}</p>
        </div>
        <div>
          <p class="pt-1 font-medium">{{job}} | {{city}}, {{country}}</p>
          <p class="text-sm font-light">{{duties}}</p>
        </div>
        {{/each}}
      </div>
    </div>
  </div>
</div>
  `
