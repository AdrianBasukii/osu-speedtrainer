"use client"

import { AnimatePresence, motion } from "motion/react";

interface Props {
    gameState?: 'idle' | 'waiting' | 'running' | 'finished'
    currGameState?: 'idle' | 'waiting' | 'running' | 'finished'
    className: string
    children: React.ReactNode
    delay: number
}

export default function AnimatedContainer( {gameState, currGameState, className, children, delay} : Props){
    if (!gameState) return <></> 
    return(
        <AnimatePresence>
            {gameState === currGameState && <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.1, delay: delay}}
                exit={{ opacity: 0, scale: 0.95, transition:{duration: 0.1, delay: 0}}}
                className={className}
            >
                {children}
            </motion.div>}
        </AnimatePresence>
    )
}