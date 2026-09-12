import { motion, AnimatePresence } from "framer-motion"
import { FaArrowRotateLeft, FaArrowRotateRight, FaFire } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

import { useState, useEffect, useRef } from "react"
import confetti from "canvas-confetti"

export default function JokeCard({ name, joke, loading, onNewJoke, onClose, onReset }) {
  const [shownText, setShownText] = useState("")
  const [typing, setTyping] = useState(false)
  const [completed, setCompleted] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (joke && !loading) {
      startTyping(joke)
    }
  }, [joke, loading])

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

  const handleLaugh = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF3333', '#FF6B33', '#FFFFFF']
    })
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex p-4 sm:p-6 overflow-y-auto z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="m-auto bg-[var(--bg-surface)] backdrop-blur-3xl rounded-[2.5rem] shadow-[0_0_80px_-15px_rgba(255,51,51,0.15)] max-w-2xl w-full border border-[var(--border-hairline)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-2 relative">
            
            {/* Inner Certificate Border */}
            <div className="border border-white/10 rounded-[2rem] p-6 sm:p-10 relative bg-black/40 shadow-inner">
              
              {/* Header / Micro-label */}
              <div className="flex justify-between items-start mb-10">
                <div className="flex flex-col gap-1">
                  <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
                    Official Document
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                    Roast Certificate
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 -mt-2 hover:bg-white/10 rounded-full transition-colors text-white/50"
                >
                  <IoCloseSharp className="w-5 h-5" />
                </button>
              </div>

              {/* Recipient Details */}
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${name}&backgroundColor=transparent`} 
                  alt="avatar" 
                  className="w-14 h-14 rounded-full border border-white/10 bg-white/5"
                />
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Issued To</span>
                  <span className="text-white font-bold text-lg">{name || 'Friend'}</span>
                </div>
              </div>
              
              {/* The Actual Joke (Playfair Display) */}
              <div className="min-h-[120px] sm:min-h-[160px] flex items-center justify-center py-2 sm:py-4">
                <div className="text-white font-playfair text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug sm:leading-tight text-center break-words w-full drop-shadow-md px-1 sm:px-4">
                  {loading ? (
                    <span className="opacity-40 animate-pulse text-white/50 text-xl font-sans">
                      Sharpening the words...
                    </span>
                  ) : (
                    <>
                      "{shownText}"
                      {typing && <span className="ml-1 text-[var(--accent)] animate-pulse">|</span>}
                    </>
                  )}
                </div>
              </div>

              {/* Footer Signature */}
              <div className="flex justify-between items-end mt-12 pt-6 border-t border-white/10">
                <div className="flex gap-2 items-center text-white/50 text-[10px] font-bold uppercase tracking-[0.1em]">
                  Verified by <FaHeart className="w-3 h-3 text-[var(--accent)] mx-1" /> AI
                </div>
                <div className="text-[10px] text-white/30 font-mono tracking-widest">
                  {new Date().toISOString().split('T')[0].replace(/-/g, '')}
                </div>
              </div>

            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 p-4 sm:px-8 sm:py-5 border-t border-[var(--border-hairline)] bg-black/30">
            <button
              className="text-white/70 hover:text-white flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold transition-all px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full hover:bg-white/10 bg-white/5 border border-white/10 active:scale-95"
              onClick={onReset}
              title="Reset All"
            >
              <FaArrowRotateLeft className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                className="text-xl hover:scale-110 active:scale-90 transition-transform p-2.5 sm:p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center"
                onClick={handleLaugh}
                title="React with Fire"
              >
                <FaFire className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B33]" />
              </button>
              
              <button
                className="bg-[var(--accent)] text-white hover:bg-[#ff4d4d] flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_var(--accent-glow)] hover:shadow-[0_0_30px_var(--accent-glow)] whitespace-nowrap"
                onClick={onNewJoke}
                disabled={loading}
              >
                <FaArrowRotateRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? "Wait..." : "Roast Again"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}