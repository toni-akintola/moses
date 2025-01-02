import Image from "next/image"

const Features = () => {
    return (
        <section className="py-20 px-4">
            <div className="max-w-[1459px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Feature 1 - Resume Builder */}
                <div className="bg-gradient-radial from-[#814A9E80] to-[#BAB0BB80] rounded-[45px] p-12 shadow-md">
                    <h2 className="text-white text-3xl font-bold mb-8">
                        Comprehensive Resume Builder
                    </h2>
                    <div className="rounded-[30px] overflow-hidden">
                        <Image
                            src="/resume-builder.png"
                            alt="Resume Builder Interface"
                            width={746}
                            height={429}
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                {/* Feature 2 - Multi-lingual */}
                <div className="bg-gradient-radial from-[#278E9B80] to-[#B7BDC580] rounded-[45px] p-12 shadow-md">
                    <h2 className="text-white text-3xl font-bold mb-8">
                        Multi-lingual Options
                    </h2>
                    <div className="rounded-[18px] overflow-hidden">
                        <Image
                            src="/multilingual.png"
                            alt="Language Options"
                            width={498}
                            height={284}
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                {/* Feature 3 - Performance Tracking */}
                <div className="bg-gradient-radial from-[#278E9B80] to-[#B7BDC580] rounded-[45px] p-12 shadow-md">
                    <h2 className="text-white text-3xl font-bold mb-8">
                        Manage matches and candidates
                    </h2>
                    <div className="rounded-[26px] overflow-hidden">
                        <Image
                            src="/candidates.png"
                            alt="Performance Analytics"
                            width={864}
                            height={275}
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                {/* Feature 4 - Virtual Assistant */}
                <div className="bg-gradient-radial from-[#814A9E80] to-[#BAB0BB80] rounded-[45px] p-12 shadow-md">
                    <h2 className="text-white text-3xl font-bold mb-8">
                        Your very own virtual assistant
                    </h2>
                    <div className="bg-white rounded-[27px] p-4">
                        <div className="rounded-[20px] overflow-hidden mb-4">
                            <Image
                                src="/assistant.png"
                                alt="Virtual Assistant Interface"
                                width={750}
                                height={181}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
