"use client"

import { AnimatePresence, motion } from "motion/react";

interface Props {
    currGameState?: 'idle' | 'waiting' | 'running' | 'finished'
    className: string
    children: React.ReactNode
}

export default function AnimatedContainer( {currGameState, className, children} : Props){
    if (!currGameState) return <></> 
    return(
        <AnimatePresence>
            {currGameState !== "finished" && <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1, delay: 0.15 }}
                className={className}
            >
                {children}
            </motion.div>}
        </AnimatePresence>
    )
}