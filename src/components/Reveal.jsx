// Wrapper that fades+slides its children in when scrolled into view.
import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0, y = 34 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
