"use client"
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
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { delay } from "@/utils/helpers"
import { BodyPayload, FormItemText, ResumeSubmission } from "@/utils/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertTriangleIcon, Trash, Trash2Icon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

const educationSchema = z.object({
    school: z.string({ required_error: "Please enter a school" }),
    country: z.string({
        required_error: "Please enter a country",
    }),
    city: z.string({
        required_error: "Please enter a city",
    }),
    degree: z.string().min(1, {
        message: "Please enter a degree",
    }),
    endDate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: "End date should be in the format YYYY-MM-DD",
    }),
})

const skillsSchema = z.object({
    title: z.string({
        required_error: "Required",
    }),
})

const certificateSchema = z.object({
    title: z.string({
        required_error: "Required",
    }),
})

export const profileSchema = z.object({
    firstName: z.string().min(1, { message: "Must be at least 1 character" }),
    lastName: z.string().min(1, { message: "Must be at least 1 character" }),
    age: z.string().min(2, {
        message: "Invalid",
    }),
    email: z.string().email({ message: "Must be at least 1 character" }),
    phoneNumber: z.coerce.number(),
    numberSlider: z.number(),
    educations: z.array(educationSchema),
    // experiences array is for the dynamic fields
    experiences: z.array(
        z.object({
            country: z.string().min(1, { message: "Please enter a country" }),
            city: z.string().min(1, { message: "Please enter a city" }),
            jobTitle: z.string().min(1, {
                message: "Please enter a title",
            }),
            employer: z.string().min(1, {
                message: "Please specify an employer",
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
                required_error: "Required",
            }),
        })
    ),
    skills: z.array(skillsSchema),
    certificates: z.array(certificateSchema),
    authorizationStatus: z.boolean({
        required_error: "Must specify",
    }),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
export type S1Props = {
    backButton: string
    general: string
    age: FormItemText
    name: {
        title: string
        placeholderOne: string
        placeholderTwo: string
        subtitle: string
    }
    phoneNumber: FormItemText
    email: FormItemText
    proficiency: { title: string; one: string; five: string; subtitle: string }
    nextButton: string
}

export type S2Props = {
    backButton: string
    title: string
    highSchool: string
    university: string
    education: {
        school: FormItemText
        country: FormItemText
        city: FormItemText
        degree: FormItemText
        startYear: FormItemText
        endYear: FormItemText
    }
    placeholders: {
        diploma: string
        ged: string
        bachelors: string
        none: string
    }
    completed: string
    add: string
    remove: string
    nextButton: string
}

export type S3Props = {
    backButton: string
    title: string
    employer: FormItemText
    jobTitle: FormItemText
    city: FormItemText
    country: FormItemText
    startYear: FormItemText
    endYear: FormItemText
    duties: FormItemText
    add: string
    remove: string
    nextButton: string
}

export type S4Props = {
    backButton: string
    title: string
    heading: string
    skills: FormItemText
    placeholders: {
        driving: string
        vehicleMaintenance: string
        construction: string
        plumbing: string
        welding: string
        equipmentOperation: string
        heavyMachineryOperation: string
        landscaping: string
        recycling: string
        fishing: string
        agriculturalWork: string
        mining: string
        manufacturing: string
        mechanicalSkills: string
        problemSolvingSkills: string
        technicalSkills: string
        physicalStrengthAndEndurance: string
        safetyProtocolsAdherence: string
        teamworkAndCollaboration: string
        attentionToDetail: string
    }
    add: string
    remove: string
    nextButton: string
}

export type S5Props = {
    backButton: string
    title: string
    heading: string
    certificates: FormItemText
    placeholders: {
        cdlCommercialDriversLicense: string
        aseCertificationAutomotiveServiceExcellence: string
        oshaCertificationOccupationalSafetyAndHealthAdministration: string
        weldingCertification: string
        forkliftOperatorCertification: string
        heavyEquipmentOperatorCertification: string
        cprCertificationCardiopulmonaryResuscitation: string
        firstAidCertification: string
        confinedSpaceEntryCertification: string
        scaffoldSafetyCertification: string
        hazardousMaterialsHandlingCertification: string
        fishingVesselSafetyCertification: string
        agriculturalPesticideApplicatorCertification: string
        miningSafetyCertification: string
        constructionSafetyCertification: string
        electricalSafetyCertification: string
        fireSafetyCertification: string
        machineGuardingCertification: string
        fallProtectionCertification: string
    }
    add: string
    remove: string
    authHeader: string
    authorization: string
    create: string
}
export type ResumeBuilderProps = {
    titleOne: string
    titleTwo: string
    subtitleOne: string
    subtitleTwo: string
    actionOne: string
    actionTwo: string
    stepOneTitle: string
    stepOneSubtitle: string
    stepTwoTitle: string
    stepTwoSubtitle: string
    stepThreeTitle: string
    stepThreeSubtitle: string
    stepFourTitle: string
    stepFourSubtitle: string
    stepFiveTitle: string
    stepFiveSubtitle: string
    stepSixTitle: string
    stepSixSubtitle: string
    loadingOne: string
    loadingTwo: string
    loadingThree: string
    loadingFour: string
    loadingFive: string
    loadingSix: string
    error: string
    errorDescription: string
}
interface ProfileFormType {
    initialData: any | null
    categories: any
    resumeBuilder: ResumeBuilderProps
    S1Props: S1Props
    S2Props: S2Props
    S3Props: S3Props
    S4Props: S4Props
    S5Props: S5Props
}

export const CreateProfileOne: React.FC<ProfileFormType> = ({
    initialData,
    categories,
    resumeBuilder: resume,
    S1Props: s1Content,
    S2Props: s2Content,
    S3Props: s3Content,
    S4Props: s4Content,
    S5Props: s5Content,
}) => {
    const loadingStates = [
        {
            text: resume.loadingOne,
        },
        {
            text: resume.loadingTwo,
        },
        {
            text: resume.loadingThree,
        },
        {
            text: resume.loadingFour,
        },
        {
            text: resume.loadingFive,
        },
        {
            text: resume.loadingSix,
        },
    ]

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [downloadState, setDownloadState] = useState(false)
    const title = initialData ? resume.titleOne : resume.titleTwo
    const description = initialData ? resume.subtitleOne : resume.subtitleTwo
    const action = initialData ? resume.actionOne : resume.actionTwo
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [data, setData] = useState({})
    const delta = currentStep - previousStep
    const { toast } = useToast()

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
                endDate: "",
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
            // const template = { html: htmlTemplate, data: data }
            const payload: BodyPayload = {
                output: "pdf",
                html: htmlTemplate,
                data: data,
                engine: "handlebars",
            }
            console.log(payload)
            await download(payload)
            return data
        } catch (error) {
            console.log(error)
            setDownloadState(false)
            toast({
                title: resume.error,
                description: resume.errorDescription,
            })
        } finally {
            delay(2000)
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
            id: resume.stepOneTitle,
            name: resume.stepOneSubtitle,
            fields: [
                "firstname",
                "lastname",
                "age",
                "email",
                "contactno",
                "numberSlider",
                "country",
                "city",
            ],
        },
        {
            id: resume.stepTwoTitle,
            name: resume.stepTwoSubtitle,
            fields: educationsFields
                ?.map((_, index) => [
                    `educations.${index}.school`,
                    `educations.${index}.city`,
                    `educations.${index}.country`,
                    `educations.${index}.degree`,
                    `educations.${index}.endDate`,
                ])
                .flat(),
        },
        {
            id: resume.stepThreeTitle,
            name: resume.stepThreeSubtitle,
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
            id: resume.stepFourTitle,
            name: resume.stepFourSubtitle,
            fields: skillsFields
                ?.map((_, index) => [`skills.${index}.title`])
                .flat(),
        },
        {
            id: resume.stepFiveTitle,
            name: resume.stepFiveSubtitle,
            // fields are mapping and flattening for the error to be trigger  for the dynamic fields
            fields: certificatesFields
                ?.map((_, index) => [`certificates.${index}.title`])
                .flat(),
        },
        { id: resume.stepSixTitle, name: resume.stepSixSubtitle },
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
                                                            .placeholderOne
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
                                                            .placeholderTwo
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
                                                                    {
                                                                        s2Content
                                                                            .education
                                                                            .school
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
                                                        name={`educations.${index}.endDate`}
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
                                                                <FormLabel className="text-black">
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
                                                endDate: "",
                                                country: "",
                                                city: "",
                                            })
                                        }
                                    >
                                        {s2Content.add}
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
                                                                    {
                                                                        s3Content
                                                                            .startYear
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
                                                        name={`experiences.${index}.endDate`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    {
                                                                        s3Content
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
                                                        name={`experiences.${index}.country`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    {
                                                                        s3Content
                                                                            .country
                                                                            .title
                                                                    }
                                                                </FormLabel>
                                                                <Input
                                                                    type="text"
                                                                    disabled={
                                                                        loading
                                                                    }
                                                                    {...field}
                                                                />
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
                                                                    {
                                                                        s3Content
                                                                            .city
                                                                            .title
                                                                    }
                                                                </FormLabel>
                                                                <Input
                                                                    type="text"
                                                                    disabled={
                                                                        loading
                                                                    }
                                                                    {...field}
                                                                />
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
                                        {s3Content.add}
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
                                                                        <SelectItem value="Problem-Solving Skills">
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
                                        {s4Content.add}
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
                                                            <FormItem className="flex flex-row items-center justify-center space-x-3 space-y-0 rounded-md border p-4">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={
                                                                            field.value
                                                                        }
                                                                        onCheckedChange={
                                                                            field.onChange
                                                                        }
                                                                        className="data-[state=checked]:bg-laserBlue data-[state=checked]:text-white border"
                                                                    />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel className="text-black">
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
                                        {s5Content.add}
                                    </Button>
                                </div>
                            </>
                        )}
                        {currentStep === 5 && (
                            <div>
                                <Button
                                    disabled={loading}
                                    className="ml-auto bg-laserBlue"
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
/**
 * resume api utils
 */

const apiUrl = `https://api.tailwindstream.io`

export function downloadToBrowser(blob: Blob, name?: string) {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = name + " Resume" + "." + blob.type.split("/")[1]
    document.body.appendChild(a)
    a.click()
    a.remove()
}

export async function requestDownload(payload: BodyPayload) {
    const response = await fetch(apiUrl + "/request", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
    })
    return (await response.json()) as { requestId?: string; error?: string }
}

// Main retry logic
const RETRY_INTERVAL_MS = 2500
const MAX_RETRIES = 4

export const download = async (payload: BodyPayload) => {
    try {
        const response = await requestDownload(payload)
        if (response.error) {
            console.log(response.error)
        }
        if (response.requestId) {
            const onComplete = (error: string = "") => {}
            downloadWithRetry(
                response.requestId,
                onComplete,
                payload.data?.name
            )
        }
    } catch (error) {}
}
export async function downloadWithRetry(
    requestId: string,
    onComplete: (error?: string) => void,
    name?: string
) {
    let retried = 0
    const intervalId = setInterval(async () => {
        const response = await fetch(`${apiUrl}/request/${requestId}/download`)
        if (response.ok) {
            const blob = await response.blob()
            clearInterval(intervalId)
            downloadToBrowser(blob, name)
            onComplete()
        } else {
            console.log(response)
            retried++
            if (retried >= MAX_RETRIES) {
                clearInterval(intervalId)
                onComplete("Download failed.")
            }
            console.error("Download failed, retrying...")
        }
    }, RETRY_INTERVAL_MS)
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
          <p class="text-xs font-light">{{endDate}}</p>
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
          <p class="text-xs font-light">{{startDate}} - {{endDate}}</p>
        </div>
        <div>
          <p class="pt-1 font-medium">{{jobTitle}} | {{city}}, {{country}}</p>
          <p class="text-sm font-light">{{duties}}</p>
        </div>
        {{/each}}
      </div>
    </div>
  </div>
</div>
  `
