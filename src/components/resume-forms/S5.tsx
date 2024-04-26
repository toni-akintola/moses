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
import { useAtom, useSetAtom } from "jotai"
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
import MyResume from "@/components/resume-preview/Resume"
import {
    Certificate,
    Education,
    Experience,
    ResumeSubmission,
    Skill,
} from "@/utils/types"

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
export default function S5() {
    const [error, setError] = useState("")
    const [downloading, setDownloading] = useState(false)
    const [payload, setPayload] = useState<BodyPayload>({
        // comment `html` when `template` prop is used
        output: "pdf",
        template: dynamicTemplate,
    })

    const setHtml = (value: string) => {
        setPayload({ ...payload, html: value })
    }

    const download = async () => {
        setDownloading(true)
        try {
            const response = await requestDownload(payload)
            if (response.error) {
                setError(response.error)
                setDownloading(false)
            }
            if (response.requestId) {
                const onComplete = (error: string = "") => {
                    setError(error)
                    setDownloading(false)
                }
                downloadWithRetry(response.requestId, onComplete)
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

    function downloadToBrowser(blob: Blob) {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = new Date().toISOString() + "." + blob.type.split("/")[1]
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
        onComplete: (error?: string) => void
    ) {
        let retried = 0
        const intervalId = setInterval(async () => {
            const response = await fetch(
                `${apiUrl}/request/${requestId}/download`
            )
            if (response.ok) {
                const blob = await response.blob()
                clearInterval(intervalId)
                downloadToBrowser(blob)
                onComplete()
            } else {
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
            // const resume: ResumeSubmission | undefined = await translate()
            // console.log("This is the resume", resume)
            // if (!resume) {
            //     return
            // }
        } catch (error) {
            console.error("Error during POST request:", error)
        }
        await download()
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
                        Atrás
                    </Link>
                    <div className="rounded-md m-6 py-12 px-8 md:px-20 bg-indigo-500 flex flex-col space-y-8 items-center">
                        <h2 className="text-base font-semibold leading-7 text-white">
                            Certificados
                        </h2>
                        {certificateFields.map((certificateField, index) => (
                            <div
                                key={certificateField.id}
                                className="gap-y-4 flex flex-col"
                            >
                                <h2 className="text-base font-semibold leading-7 text-white self-center">
                                    Certificado {index + 1}
                                </h2>
                                <FormField
                                    control={form.control}
                                    name={`certificates.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">
                                                Titulo
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className="w-56">
                                                        <SelectValue placeholder="Certificados" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel></SelectLabel>
                                                            <SelectItem value="CDL (Commercial Driver's License)">
                                                                Licencia de
                                                                Conductor
                                                                Comercial (CDL)
                                                            </SelectItem>
                                                            <SelectItem value="ASE Certification (Automotive Service Excellence)">
                                                                Certificación
                                                                ASE (Excelencia
                                                                en Servicio
                                                                Automotriz)
                                                            </SelectItem>
                                                            <SelectItem value="OSHA Certification (Occupational Safety and Health Administration)">
                                                                Certificación
                                                                OSHA
                                                                (Administración
                                                                de Seguridad y
                                                                Salud
                                                                Ocupacional)
                                                            </SelectItem>
                                                            <SelectItem value="Welding Certification">
                                                                Certificación de
                                                                Soldadura
                                                            </SelectItem>
                                                            <SelectItem value="Forklift Operator Certification">
                                                                Certificación de
                                                                Operador de
                                                                Montacargas
                                                            </SelectItem>
                                                            <SelectItem value="Heavy Equipment Operator Certification">
                                                                Certificación de
                                                                Operador de
                                                                Equipos Pesados
                                                            </SelectItem>
                                                            <SelectItem value="CPR Certification (Cardiopulmonary Resuscitation)">
                                                                Certificación de
                                                                RCP (Reanimación
                                                                Cardiopulmonar)
                                                            </SelectItem>
                                                            <SelectItem value="First Aid Certification">
                                                                Certificación de
                                                                Primeros
                                                                Auxilios
                                                            </SelectItem>
                                                            <SelectItem value="Confined Space Entry Certification">
                                                                Certificación de
                                                                Entrada a
                                                                Espacios
                                                                Confinados
                                                            </SelectItem>
                                                            <SelectItem value="Scaffold Safety Certification">
                                                                Certificación de
                                                                Seguridad en
                                                                Andamios
                                                            </SelectItem>
                                                            <SelectItem value="Hazardous Materials Handling Certification">
                                                                Certificación de
                                                                Manejo de
                                                                Materiales
                                                                Peligrosos
                                                            </SelectItem>
                                                            <SelectItem value="Fishing Vessel Safety Certification">
                                                                Certificación de
                                                                Seguridad en
                                                                Embarcaciones de
                                                                Pesca
                                                            </SelectItem>
                                                            <SelectItem value="Agricultural Pesticide Applicator Certification">
                                                                Certificación de
                                                                Aplicador de
                                                                Pesticidas
                                                                Agrícolas
                                                            </SelectItem>
                                                            <SelectItem value="Mining Safety Certification">
                                                                Certificación de
                                                                Seguridad en
                                                                Minería
                                                            </SelectItem>
                                                            <SelectItem value="Construction Safety Certification">
                                                                Certificación de
                                                                Seguridad en
                                                                Construcción
                                                            </SelectItem>
                                                            <SelectItem value="Electrical Safety Certification">
                                                                Certificación de
                                                                Seguridad
                                                                Eléctrica
                                                            </SelectItem>
                                                            <SelectItem value="Fire Safety Certification">
                                                                Certificación de
                                                                Seguridad contra
                                                                Incendios
                                                            </SelectItem>
                                                            <SelectItem value="Machine Guarding Certification">
                                                                Certificación de
                                                                Protección de
                                                                Maquinaria
                                                            </SelectItem>
                                                            <SelectItem value="Fall Protection Certification">
                                                                Certificación de
                                                                Protección
                                                                contra Caídas
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription className="text-white">
                                                Entra el nombre del su
                                                certificado.
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
                                        Eliminar certificado
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
                            Agregar certificado
                        </button>
                        <h2 className="text-base font-semibold leading-7 text-white">
                            Estado de Autorización
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
                                            ¿Tiene autorización legal de
                                            trabajar en los Estados Unidos?
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="bg-white text-indigo-500 py-2 px-4 rounded-md hover:bg-gray-200"
                        >
                            Crear Currículum
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

const dynamicTemplate = {
    html: `
<div class="p-10">
  <div class="max-w-4xl mx-auto bg-white p-5">
      <header class="flex justify-between mb-10">
          <div>
              <h1 class="text-xl font-bold">{{businessName}}</h1>
              <p>{{businessAddress}}</p>
              <p>Email: {{businessEmail}}</p>
              <p>Phone: {{businessPhone}}</p>
          </div>
          <div>
              <h2 class="text-lg font-bold">Invoice</h2>
              <p>Invoice Number: {{invoiceNumber}}</p>
              <p>Date: {{invoiceDate}}</p>
              <p>Due Date: {{dueDate}}</p>
          </div>
      </header>
      <section class="mb-5">
          <h3 class="font-bold text-lg mb-3">Bill To:</h3>
          <p>{{clientName}}</p>
          <p>{{clientAddress}}</p>
      </section>
      <table class="min-w-full table-auto">
          <thead>
              <tr class="bg-gray-200">
                  <th class="px-4 py-2 text-left">Item</th>
                  <th class="px-4 py-2 text-left">Quantity</th>
                  <th class="px-4 py-2 text-left">Price</th>
                  <th class="px-4 py-2 text-left">Total</th>
              </tr>
          </thead>
          <tbody>
              {{#each items}}
              <tr>
                  <td class="border px-4 py-2">{{name}}</td>
                  <td class="border px-4 py-2">{{quantity}}</td>
                  <td class="border px-4 py-2">{{price}}</td>
                  <td class="border px-4 py-2">{{total}}</td>
              </tr>
              {{/each}}
          </tbody>
      </table>
      <div class="text-right mt-4">
          <strong>Total Due: {{totalDue}}</strong>
      </div>
      <footer class="mt-5">
          <p>Payment Terms: {{paymentTerms}}</p>
          <p>Thank you for your business!</p>
      </footer>
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
