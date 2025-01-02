import Image from "next/image"

const GetStarted = () => {
    return (
        <section className="py-12 px-4">
            <div className="max-w-[1601px] mx-auto flex flex-col md:flex-row gap-12 items-center">
                {/* Left side - Text content */}
                <div className="flex-1 space-y-8">
                    <h2 className="text-5xl font-bold text-white">
                        Ready to get started?
                    </h2>
                    <p className="text-xl text-white">
                        Join our platform for free and experience the power of
                        automated job matching
                    </p>
                    <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-opacity-90 transition-all">
                        Sign up for free
                    </button>
                </div>

                {/* Right side - Image */}
                <div className="flex-1">
                    <div className="bg-[#D9D9D9] rounded-[26px] p-6 relative">
                        <div className="relative w-full aspect-[514/407]">
                            <Image
                                src="/dashboard-preview.png" // Make sure to add this image to your public folder
                                alt="Dashboard Preview"
                                fill
                                className="object-cover rounded-[27px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GetStarted
