import { motion } from "framer-motion"
import { FiGithub,FiLinkedin } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer 
      className="w-full py-4 sm:py-6 md:py-8 border-t border-[#F5F1DC]/20 backdrop-blur-md bg-[#001BB7]/50 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4">
          <div className="text-[#F5F1DC]/70 text-xs sm:text-sm">
            Powered by icanhazdadjoke.com
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-[#F5F1DC] text-xs sm:text-sm">Made by Ashutosh</span>
            <div className="flex gap-3 sm:gap-4">
              <a 
                href="https://ashutoshmoharana.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#F5F1DC] hover:text-[#FF8040] transition-colors"
              >
                <FaRegUser className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/ashutosh-moharana" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#F5F1DC] hover:text-[#FF8040] transition-colors"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/ashutosh-moharana/banterbuddy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#F5F1DC] hover:text-[#FF8040] transition-colors"
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