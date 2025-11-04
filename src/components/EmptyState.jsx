import { motion } from "framer-motion"
import { IoSparklesOutline } from "react-icons/io5";
import { FiZap } from "react-icons/fi";
import { FaRegFaceLaughBeam } from "react-icons/fa6";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center max-w-2xl mx-auto py-8 md:py-12"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1 }}
        className="text-5xl sm:text-6xl mb-6"
      >
        😄
      </motion.div>
      
      <motion.h2 
        className="text-3xl font-bold text-[#F5F1DC] mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Ready to Laugh?
      </motion.h2>
      
      <motion.p 
        className="text-lg text-[#F5F1DC]/70 mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Enter your name and let Banter Buddy create a personalized dad joke masterpiece
      </motion.p>
      
      <motion.div
        className="flex justify-center gap-6 text-[#F5F1DC]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <IoSparklesOutline className="w-4 h-4" />
          <span>Animated</span>
        </div>
        <div className="flex items-center gap-2">
          <FiZap className="w-4 h-4" />
          <span>Instant</span>
        </div>
        <div className="flex items-center gap-2">
          <FaRegFaceLaughBeam className="w-4 h-4"/>
          <span>Funny</span>
        </div>
      </motion.div>
    </motion.div>
  )
}