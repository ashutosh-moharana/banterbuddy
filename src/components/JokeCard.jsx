import { motion, AnimatePresence } from "framer-motion"
import { FaArrowRotateLeft,FaArrowRotateRight } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoSparklesOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

import { useState, useEffect, useRef } from "react"

export default function JokeCard({ name, joke, loading, onNewJoke, onClose, onReset }) {
  const [shownText, setShownText] = useState("")
  const [typing, setTyping] = useState(false)
  const [completed, setCompleted] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (joke && !loading) {
      startTyping(`${name}, ${joke}`)
    }
  }, [joke, loading, name])

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  function startTyping(text) {
    clearInterval(intervalRef.current)
    setShownText("")
    setCompleted(false)
    setTyping(true)

    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      setShownText(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(intervalRef.current)
        setTyping(false)
        setCompleted(true)
      }
    }, 30)
  }

  function handleNewJoke() {
    onNewJoke()
  }

  function handleReset() {
    onReset()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-[#F5F1DC] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] md:max-h-[80vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-[#0046FF]/20">
            <div className="flex items-center gap-3">
              <IoSparklesOutline className="size-4 text-[#FF8040]" />
              <h3 className="text-base sm:text-lg font-semibold text-[#001BB7]">Banter Buddy</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#0046FF]/10 rounded-lg transition-colors"
            >
              <IoCloseSharp className="w-5 h-5 text-[#001BB7]" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <div className="badge bg-[#0046FF] text-[#F5F1DC] border-0 text-xs sm:text-sm">
                For {name || 'Friend'}
              </div>
            </div>
            
            <div className="min-h-[150px] sm:min-h-[200px] flex items-center justify-center">
              <div className="text-[#001BB7] font-medium text-lg sm:text-xl md:text-2xl leading-relaxed text-center break-words px-2 sm:px-4">
                {loading ? (
                  <span className="opacity-70">Creating your banter...</span>
                ) : (
                  <>
                    {shownText}
                    {typing && <span className="ml-1 text-[#FF8040] animate-pulse">|</span>}
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#0046FF]/20">
              <div className="flex gap-2 items-center text-[#001BB7]/60 text-sm">
                
                Made with <FaHeart  className="w-4 h-4 text-[#FF8040]" />  by<span className="font-bold inline-block">Ashutosh</span>
              </div>
              <div className="hidden md:block text-[#001BB7]/60 text-sm">banterbuddy.fun</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between gap-3 p-6 border-t border-[#0046FF]/20 bg-[#F5F1DC]/50">
            <motion.button
              className="btn btn-ghost text-[#001BB7] hover:bg-[#0046FF]/10 gap-2"
              onClick={handleReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowRotateLeft className="w-4 h-4" />
              Reset All
            </motion.button>
            
            <div className="flex gap-3">
              <motion.button
                className="btn bg-[#FF8040] text-[#F5F1DC] hover:bg-[#FF8040]/90 gap-2"
                onClick={handleNewJoke}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaArrowRotateRight className="w-4 h-4" />
                {loading ? "Loading..." : "New Joke"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}