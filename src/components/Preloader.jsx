// Animated intro shown while the 3D scene loads behind it.
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="preloader" exit={{ opacity: 0, transition: { duration: 0.6 } }}>
          <motion.div
            className="preloader-logo"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            Bhanu
          </motion.div>
          <div className="preloader-bar">
            <motion.span initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
