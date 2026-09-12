import { motion, AnimatePresence } from "framer-motion";
import { FiZap } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";

const REASON_OPTIONS = [
  { isGroup: true, label: "Social Quirks" },
  { value: "Chronically online (Reels addict)", label: "Reels dekh dekh ke mera dimaag ka dahi ban gaya" },
  { value: "Texts back after 3 business days", label: "Mera reply courier delivery jaisa aata hai" },
  { value: "Always cancelling plans", label: "Plan mai banata hu, cancel bhi khud hi karta hu" },
  { value: "Talks too much", label: "Bolne ka mera data pack unlimited hai" },
  { value: "Socially unavailable", label: "Group mein hota hu, present kabhi nahi hota" },
  { value: "Bad at replying", label: "Seen karke bhi gayab ho jaata hu" },

  { isGroup: true, label: "Desi Tropes" },
  { value: "Addicted to chai", label: "Khoon kam hai, chai zyada hai mere badan mein" },
  { value: "Exam panic specialist", label: "10 min padhta hu, AIR 1 ki tayyari karta hu" },
  { value: "Obsessed with cricket", label: "Khud se zyada mujhe Kohli ki average yaad hai" },
  { value: "Always hungry", label: "Sirf khaane ke naam pe function attend karta hu" },
  { value: "Always asking for food", label: "Ghar aata hu, seedha kitchen mein ghusta hu" },

  { isGroup: true, label: "Personality" },
  { value: "Main character syndrome", label: "Khud ko movie ka hero samajhta hu, sab side characters" },
  { value: "Delusional overthinker", label: "Ek msg pe pura serial likh deta hu dimaag mein" },
  { value: "Too dramatic", label: "Chhoti baat pe Ekta Kapoor serial bana deta hu" },
  { value: "Thinks they're funny", label: "Khud hi hasta hu apni jokes pe" },
  { value: "Acts like they know everything", label: "Google se zyada mera confidence hai, accuracy kam" },
  { value: "Makes everything a competition", label: "Ludo mein bhi career ban jaata hai mere liye" },

  { isGroup: true, label: "Lifestyle" },
  { value: "Corporate slave", label: "9 to 9 naukar hu, LinkedIn pe hustler" },
  { value: "Gym obsessed", label: "Do saal se gym kar raha hu, body abhi bhi first week jaisi" },
  { value: "Always late", label: "Time ko suggestion samajhta hu, rule nahi" },
  { value: "Sleeps too much", label: "Bhaloo bhi mere saamne early riser hai" },
  { value: "Always broke", label: "Mera bank balance dekh ke RBI bhi tension mein aa jaaye" },
  { value: "Takes forever to get ready", label: "Mujhe ready hone mein NASA ka countdown bhi chhota lagta hai" },

  { isGroup: true, label: "Other" },
  { value: "custom", label: "Custom reason..." },
];

const CustomSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        type="button"
        className="w-full bg-white/5 border border-white/10 text-left px-6 py-4 rounded-full flex items-center justify-between text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--accent)] shadow-inner transition-all hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate block mr-4 opacity-90">
          {REASON_OPTIONS.find(o => o.value === value)?.label || "Select a reason (Optional)"}
        </span>
        <svg className="w-4 h-4 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
           <motion.div 
             initial={{ opacity: 0, y: -10 }} 
             animate={{ opacity: 1, y: 0 }} 
             exit={{ opacity: 0, y: -10 }}
             transition={{ duration: 0.15 }}
             className="absolute z-50 w-full mt-2 bg-[#1A1A1A]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl max-h-72 overflow-y-auto"
           >
             {REASON_OPTIONS.map((opt, i) => (
                opt.isGroup ? (
                  <div key={`group-${i}`} className="px-5 py-3 mt-2 text-[10px] font-bold text-white/40 uppercase tracking-wider bg-transparent sticky top-0 z-10 backdrop-blur-md">
                    {opt.label}
                  </div>
                ) : (
                  <div 
                    key={opt.value} 
                    className={`px-5 py-3 text-sm cursor-pointer transition-colors hover:bg-white/10 ${value === opt.value ? 'text-[var(--accent)] bg-white/5 font-bold' : 'text-white/80'}`}
                    onClick={() => { onChange(opt.value); setIsOpen(false); }}
                  >
                    {opt.label}
                  </div>
                )
             ))}
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Header({ name, setName, reason, setReason, customReason, setCustomReason, loading, onGenerate }) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full px-4 py-8 md:py-16 max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start justify-between"
    >
      <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start mt-0 md:mt-8">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-4 flex items-center justify-center md:justify-start gap-3 tracking-tight text-white drop-shadow-lg">
          <IoSparklesOutline className="text-[var(--accent)] drop-shadow-[0_0_15px_var(--accent)]" />
          Banter Buddy
        </h1>
        <p className="text-[var(--text-muted)] text-lg md:text-xl font-light tracking-wide max-w-sm leading-relaxed">
          Say your name. Choose your roast.
        </p>
      </div>

      <div className="w-full md:w-[460px] flex-shrink-0 flex flex-col gap-6 relative mt-8 md:mt-0">
        
        <div className="space-y-6">
          <div>
            <label className="block text-[var(--text-muted)] text-[11px] uppercase tracking-[0.2em] font-semibold mb-3 ml-2">The Victim</label>
            <input
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:bg-white/10 px-6 py-4 rounded-full text-sm font-medium transition-all shadow-inner"
              placeholder="Hey legend... your name?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onGenerate()}
            />
          </div>
          
          <div>
            <label className="block text-[var(--text-muted)] text-[11px] uppercase tracking-[0.2em] font-semibold mb-3 ml-2">What's their deal?</label>
            <CustomSelect value={reason} onChange={setReason} />
            
            <AnimatePresence>
              {reason === 'custom' && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <input
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:bg-white/10 px-6 py-4 rounded-full text-sm font-medium transition-all shadow-inner"
                    placeholder="e.g. thinks he's a professional photographer"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onGenerate()}
                    maxLength={120}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          className={`w-full py-4 mt-6 rounded-full text-white font-bold text-sm tracking-widest uppercase bg-[var(--accent)] transition-all duration-300 hover:bg-[#ff4d4d] active:scale-[0.98] flex items-center justify-center gap-3 shadow-[0_0_30px_var(--accent-glow)] hover:shadow-[0_0_50px_var(--accent-glow)] ${loading || !name.trim() ? 'opacity-50 cursor-not-allowed shadow-none hover:shadow-none' : ''}`}
          onClick={onGenerate}
          disabled={loading || !name.trim()}
        >
          {loading ? (
             <span className="animate-pulse">Sharpening words...</span>
          ) : (
            <>
              <FiZap className="w-5 h-5" />
              Roast Me
            </>
          )}
        </button>
      </div>
    </motion.header>
  );
}