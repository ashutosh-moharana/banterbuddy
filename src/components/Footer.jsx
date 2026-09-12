import { motion } from "framer-motion"
import { FiGithub,FiLinkedin } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer 
      className="w-full py-4 sm:py-6 md:py-8 bg-transparent mt-auto relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-[var(--text-muted)] text-xs sm:text-sm">Made by Ashutosh</span>
            <div className="flex gap-3 sm:gap-4">
              <a 
                href="https://ashmo.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <FaRegUser className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/ashutosh-moharana" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/ashutosh-moharana/banterbuddy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <FiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}