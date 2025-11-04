import { motion } from "framer-motion"
import { FiZap } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";

export default function Header({ name, setName, loading, onGenerate }) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full px-4 py-8 flex flex-col items-center gap-6"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <IoSparklesOutline className="w-6 h-6 text-[#FF8040]" />
          <h1 className="text-4xl font-bold text-[#F5F1DC]">
            Banter Buddy
          </h1>
          <IoSparklesOutline className="w-6 h-6 text-[#FF8040]" />
        </div>
        <p className="text-[#F5F1DC]/80 text-lg">
          Say your name. Get the joke.
        </p>
      </motion.div>

      <motion.div 
        className="flex flex-col gap-4 items-center w-full max-w-md mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="w-full">
          <motion.input
            className="input input-lg w-full bg-[#F5F1DC]/10 backdrop-blur-md border-[#F5F1DC]/20 text-[#F5F1DC] placeholder-[#F5F1DC]/60 focus:bg-[#F5F1DC]/15 focus:border-[#FF8040]"
             placeholder="Hey legend... your name?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onGenerate()}
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <motion.button
          className={`btn btn-lg bg-gradient-to-r from-[#FF8040] to-[#0046FF] border-0 text-[#F5F1DC] font-semibold w-full sm:w-auto ${loading ? "loading" : ""}`}
          onClick={onGenerate}
          disabled={loading || !name.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
         
          <FiZap className="w-5 h-5 mr-2" />
          Generate
        </motion.button>
      </motion.div>
    </motion.header>
  )
}