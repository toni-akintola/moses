import { motion } from "motion/react"

export type Props = {
    text: string
}
const AnimatedHeader = (props: Props) => {
    return (
        <div>
            {props.text.split(" ").map((el, i) => (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.25,
                        delay: i / 10,
                    }}
                    className="text-4xl font-bold tracking-tight text-indigo-500 sm:text-6xl"
                    key={i}
                >
                    {el}{" "}
                </motion.span>
            ))}
        </div>
    )
}

export default AnimatedHeader
