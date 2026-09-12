import { motion } from "framer-motion"

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full mt-4 md:mt-12 flex justify-center"
    >
      <div className="w-full max-w-2xl border-2 border-dashed border-[var(--border-hairline)] bg-[var(--bg-surface)]/30 rounded-3xl p-12 flex flex-col items-center justify-center opacity-60 select-none">
        <div className="text-5xl mb-6 opacity-30 grayscale">📜</div>
        <h2 className="font-fraunces text-2xl text-[var(--text-muted)] font-semibold mb-3">
          Your Banter Awaits
        </h2>
        <p className="text-[var(--text-muted)] text-sm max-w-sm text-center leading-relaxed">
          Fill out the details above and let the AI cook up something completely unhinged (or surprisingly wholesome).
        </p>
      </div>
    </motion.div>
  )
}