import { motion } from "framer-motion"

export type Props = {
    text: string
}
const AnimatedHeader = (props: Props) => {
    return (
        <div className="text-center flex">
            {props.text.split(" ").map((el, i) => (
                <motion.span
                    className="text-4xl font-bold tracking-tight text-indigo-300 sm:text-6xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.25,
                        delay: i / 10,
                    }}
                    key={i}
                >
                    {el}{" "}
                </motion.span>
            ))}
        </div>
    )
}

export default AnimatedHeader
