"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
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
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowLeft, MinusCircle, PlusCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
    ageAtom,
    authorizationStatusAtom,
    certificatesAtom,
    downloadAtom,
    educationsAtom,
    emailAtom,
    experiencesAtom,
    nameAtom,
    numberAtom,
    proficiencyAtom,
    skillsAtom,
    translateAtom,
} from "@/utils/atoms"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { useRouter } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import {
    Certificate,
    Education,
    Experience,
    FormItemText,
    ResumeSubmission,
    Skill,
} from "@/utils/types"
import { Spinner } from "@/components/motion/Spinner"

const certificateSchema = z.object({
    title: z.string({
        required_error: "Inválido.",
    }),
})

const stepFiveSchema = z.object({
    authorizationStatus: z.boolean({
        required_error: "Inválido.",
    }),
    certificates: z.array(certificateSchema),
})
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
type BodyPayload = {
    html?: string // must be undefined if 'template' prop is used
    format?: // applicable only for pdf, default a4
    | "LETTER"
        | "LEGAL"
        | "TABLOID"
        | "LEDGER"
        | "A0"
        | "A1"
        | "A2"
        | "A3"
        | "A4"
        | "A5"
        | "A6"
        | "Letter"
        | "Legal"
        | "Tabloid"
        | "Ledger"
    output?: "pdf" | "png" | "jpeg" | "webp" // default pdf
    size?: {
        scale?: string | number // default 2, can be up to 6
        width?: string | number // default 210
        height?: string | number // default 297
        unit?: "px" | "in" | "cm" | "mm" // default mm
    }
    template?: {
        html: string
        data: Record<string, any>
    }
}
export default function S5(props: S5Props) {
    const [error, setError] = useState("")
    const [downloading, setDownloading] = useAtom(downloadAtom)
    const [payload, setPayload] = useState<BodyPayload>({
        // comment `html` when `template` prop is used
        output: "pdf",
        template: placeholderTemplate,
    })

    const setTemplate = (value: {
        html: string
        data: Record<string, any>
    }) => {
        setPayload({ ...payload, template: value })
    }

    const download = async () => {
        setDownloading(true)
        try {
            const response = await requestDownload(payload)
            if (response.error) {
                console.log(response.error)
                setError(response.error)
                setDownloading(false)
            }
            if (response.requestId) {
                const onComplete = (error: string = "") => {
                    setError(error)
                    setDownloading(false)
                }
                downloadWithRetry(
                    response.requestId,
                    onComplete,
                    payload.template?.data.name
                )
            }
        } catch (error) {
            setError("Something went wrong.")
            setDownloading(false)
        }
    }

    /**
     * api utils
     */

    const apiUrl = `https://api.tailwindstream.io`

    function downloadToBrowser(blob: Blob, name?: string) {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = name + " Resume" + "." + blob.type.split("/")[1]
        document.body.appendChild(a)
        a.click()
        a.remove()
    }

    async function requestDownload(payload: BodyPayload) {
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

    async function downloadWithRetry(
        requestId: string,
        onComplete: (error?: string) => void,
        name?: string
    ) {
        let retried = 0
        const intervalId = setInterval(async () => {
            const response = await fetch(
                `${apiUrl}/request/${requestId}/download`
            )
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

    // Additional info states
    const [authorizationStatus, setAuthorizationStatus] = useAtom(
        authorizationStatusAtom
    )
    const [certificates, setCertificates] = useAtom(certificatesAtom)

    const translate = useSetAtom(translateAtom)

    // 1. Define your form.
    const form = useForm<z.infer<typeof stepFiveSchema>>({
        resolver: zodResolver(stepFiveSchema),
        defaultValues: {
            authorizationStatus: false,
            certificates: [
                {
                    title: "",
                },
            ],
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof stepFiveSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        setCertificates(values.certificates)
        setAuthorizationStatus(values.authorizationStatus)

        console.log("Before POST request")
        try {
            const resume: ResumeSubmission | undefined = await translate()
            console.log("This is the resume", resume)
            if (!resume) {
                return
            }
            const template = { html: htmlTemplate, data: resume }
            console.log(template)
            setTemplate(template)
        } catch (error) {
            console.error("Error during POST request:", error)
        }
        // finally {
        //     await download()
        // }
    }

    const {
        fields: certificateFields,
        append: certificateAppend,
        remove: certificateRemove,
    } = useFieldArray({
        control: form.control,
        name: "certificates",
    })

    return (
        <div className="border-t py-4 px-8 border-gray-900/10 bg-white flex items-center flex-col justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-md p-4 border bg-indigo-500 flex flex-col"
                >
                    <Link
                        href="s4"
                        className="flex flex-row w-1/4 items-center justify-center text-indigo-500 bg-white rounded-md p-1 mb-2"
                    >
                        <ArrowLeft className="h-4 w-4 text-indigo-500" />
                        {props.backButton}
                    </Link>
                    <div className="rounded-md m-6 py-12 px-8 md:px-20 bg-indigo-500 flex flex-col space-y-8 items-center">
                        <h2 className="text-base font-semibold leading-7 text-white">
                            {props.heading}
                        </h2>
                        {certificateFields.map((certificateField, index) => (
                            <div
                                key={certificateField.id}
                                className="gap-y-4 flex flex-col"
                            >
                                <h2 className="text-base font-semibold leading-7 text-white self-center">
                                    {props.title} {index + 1}
                                </h2>
                                <FormField
                                    control={form.control}
                                    name={`certificates.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                {props.certificates.title}
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className="w-56">
                                                        <SelectValue
                                                            placeholder={
                                                                props
                                                                    .certificates
                                                                    .placeholder
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel></SelectLabel>
                                                            <SelectItem value="CDL (Commercial Driver's License)">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .cdlCommercialDriversLicense
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="ASE Certification (Automotive Service Excellence)">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .aseCertificationAutomotiveServiceExcellence
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="OSHA Certification (Occupational Safety and Health Administration)">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .oshaCertificationOccupationalSafetyAndHealthAdministration
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Welding Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .weldingCertification
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Forklift Operator Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .forkliftOperatorCertification
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Heavy Equipment Operator Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .heavyEquipmentOperatorCertification
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="CPR Certification (Cardiopulmonary Resuscitation)">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .cprCertificationCardiopulmonaryResuscitation
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="First Aid Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .firstAidCertification
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Confined Space Entry Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .confinedSpaceEntryCertification
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Scaffold Safety Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .scaffoldSafetyCertification
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Hazardous Materials Handling Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .hazardousMaterialsHandlingCertification
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Fishing Vessel Safety Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .fishingVesselSafetyCertification
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Agricultural Pesticide Applicator Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .agriculturalPesticideApplicatorCertification
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Mining Safety Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .miningSafetyCertification
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Construction Safety Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .constructionSafetyCertification
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Electrical Safety Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .electricalSafetyCertification
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Fire Safety Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .fireSafetyCertification
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Machine Guarding Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .machineGuardingCertification
                                                                }
                                                            </SelectItem>
                                                            <SelectItem value="Fall Protection Certification">
                                                                {
                                                                    props
                                                                        .placeholders
                                                                        .fallProtectionCertification
                                                                }
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                {props.certificates.subtitle}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* <FormField
                                    control={form.control}
                                    name={`certificates.${index}.description`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                Descripción (opcional)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Clase de 6 meses..."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                Entra una descripción del
                                                certificado.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}

                                {certificateFields.length >= 2 && (
                                    <button
                                        type="button"
                                        className="text-white py-1 px-4 rounded-md flex flex-row items-center gap-x-3"
                                        onClick={() => {
                                            certificateRemove(index)
                                        }}
                                    >
                                        <MinusCircle className="h-4 w-4" />
                                        {props.remove}
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            className="text-white py-1 px-4 rounded-md flex flex-row items-center gap-x-3"
                            onClick={() => {
                                certificateAppend({
                                    title: "",
                                })
                            }}
                        >
                            <PlusCircle className="h-4 w-4" />
                            {props.add}
                        </button>
                        <h2 className="text-base font-semibold leading-7 text-white">
                            {props.authHeader}
                        </h2>
                        <FormField
                            control={form.control}
                            name="authorizationStatus"
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
                                            {props.authorization}
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="bg-white text-indigo-500 py-2 px-4 rounded-md hover:bg-gray-200"
                        >
                            {downloading ? <Spinner /> : props.create}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

const placeholderTemplate = {
    html: `
<div class="h-[297mm] w-[210mm] bg-gray-100 p-12">
  <div class="flex">
    <div class="mt-16 grid w-[40%] border-2 border-gray-400 p-10">
      <div class="grid gap-8">
        <p class="text-4xl font-semibold">{{name}}</p>
      </div>
      <div class="pt-5">
        <p class="text-2xl font-medium">Contact</p>
        <div class="grid gap-2 pt-4 text-sm font-light">
          <p>{{phoneNumber}}</p>
          <p>{{email}}</p>
        </div>
      </div>
      <div class="flex flex-col gap-5 pt-5">
        <p class="text-2xl font-medium">Skills</p>
        <div class="flex flex-col gap-2">
          {{#each skills}}
          <p class="">{{title}}</p>
          {{/each}}
        </div>
      </div>
      <p class="text-2xl font-medium">Cerfificates</p>
      <div class="flex flex-col gap-2">
        {{#each certificates}}
        <p class="">{{title}}</p>
        {{/each}}
      </div>
    </div>
    <div>
      <div class="pl-10 pt-10">
        <p class="text-2xl font-semibold">Education History</p>
        {{#each educations}}
        <div class="flex items-center justify-between pt-4">
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
        <div class="flex flex-col pt-4">
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
  `,
    data: {
        businessName: "Your Company Name",
        businessAddress: "123 Business Rd, Business City, BC 12345",
        businessEmail: "contact@yourcompany.com",
        businessPhone: "+1 234 567 8900",
        invoiceNumber: "2023-001",
        invoiceDate: "April 10, 2024",
        dueDate: "May 10, 2024",
        clientName: "Client Co.",
        clientAddress: "789 Client St, Client City, CC 67890",
        items: [
            { name: "Widget", quantity: 4, price: "$10.00", total: "$40.00" },
            { name: "Gadget", quantity: 2, price: "$15.00", total: "$30.00" },
            {
                name: "Doohickey",
                quantity: 1,
                price: "$20.00",
                total: "$20.00",
            },
        ],
        totalDue: "90.00",
        paymentTerms: "Net 30",
    },
}

const htmlTemplate = `
<div class="h-full w-full flex p-2">
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
    </div>
    <div>
      <div class="pl-10 pt-10">
        <p class="text-2xl font-semibold">Education History</p>
        {{#each educations}}
        <div class="flex flex-col pt-4">
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
        <p class="text-2xl font-medium">Certificates</p>
      <div class="flex flex-col gap-5 pt-5">
        {{#each certificates}}
        <p class="text-xs">{{title}}</p>
        {{/each}}
      </div>
      </div>
    </div>
  </div>
</div>
  `
