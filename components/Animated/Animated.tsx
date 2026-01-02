'use client';

import { motion } from "framer-motion";
import { ReactNode } from "react";

function Animated({ children, delay = 0, }: { children: ReactNode, delay?: number }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }} transition={{duration:0.5, delay}}
      >
        {children}
      </motion.div>
    );
    
}

export default Animated;