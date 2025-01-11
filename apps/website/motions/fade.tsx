import * as motion from "motion/react-client"

export const FadeFromBottom = ({ children, className, duration, delay, animateOnce = true }: { children?: React.ReactNode, className?: string, duration?: number, delay?: number, animateOnce?: boolean }) => {
  return <motion.div
    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: duration ?? 0.4, delay: delay ?? 0 }}
    viewport={{ once: animateOnce }}
    className={className}
  >
    {children}
  </motion.div>
}

export const FadeFromTop = ({ children, className, duration, delay, animateOnce = true }: { children?: React.ReactNode, className?: string, duration?: number, delay?: number, animateOnce?: boolean   }) => {
  return <motion.div
    initial={{ opacity: 0, y: -40, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: duration ?? 0.4, delay: delay ?? 0 }}
    viewport={{ once: animateOnce }}
    className={className}
  >
    {children}
  </motion.div>
}

export const Fade = ({ children, className, duration, delay, animateOnce = true }: { children?: React.ReactNode, className?: string, duration?: number, delay?: number, animateOnce?: boolean }) => {
  return <motion.div
    initial={{ opacity: 0, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, filter: "blur(0px)" }}
    transition={{ duration: duration ?? 0.4, delay: delay ?? 0 }}
    viewport={{ once: animateOnce }}
    className={className}
  >
    {children}
  </motion.div>
}