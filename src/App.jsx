import { useState } from "react"
import Header from "./components/Header"
import JokeCard from "./components/JokeCard"
import Footer from "./components/Footer"
import { GoogleGenerativeAI } from "@google/generative-ai"

export default function App() {
  const [name, setName] = useState("")
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [joke, setJoke] = useState("")
  const [loading, setLoading] = useState(false)
  const [showCard, setShowCard] = useState(false)

  const generateAIContent = async (currentName, currentReason) => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        return "Oops! Missing Gemini API Key in .env file.";
      }
      
      const genAI = new GoogleGenerativeAI(apiKey);
      
      const prompt = `
You are a savage, sharp-tongued Indian friend roasting ${currentName} in a group chat. This is real friend-group banter — the kind where everyone laughs because it's TRUE, not because it's clever wordplay.

REASON: "${currentReason || "No specific reason — just roast their general vibe."}"

HOW REAL ROASTS SOUND (study the pattern, don't copy):
- Reason "Always late" → "Arre Rohan, tu itna late aata hai ki Uber driver bhi teri location dekh ke resign kar deta hai."
- Reason "Always broke" → "Saale Priya, tera bank balance itna negative hai ki RBI tujhe hi loan de raha hai."
- Reason "Thinks they're a stand-up comedian" → "Bhai Arjun, tu comedy karta hai ya crowd ko silence practice karwata hai, samajh nahi aata."
- Reason "Gym obsessed but no gains" → "Yaar Karan, do saal se gym ja raha hai but tera body abhi bhi WiFi signal jaisa hai — weak aur unstable."

WHY THESE WORK: they address the person directly, they exaggerate the reason into a vivid comparison, and they stop the SECOND the punchline lands. No build-up, no explanation after.

RULES:
- Address ${currentName} directly, like you're talking TO them, not about them.
- Mild Hinglish slang is fine and encouraged (saala, bakchod, chomu, nalayak, faaltu) — this is what makes it feel real, not AI-sanitized. No actual abuse, slurs, or anything targeting appearance/family/serious topics.
- One sharp line. 12-30 words. Stop after the punchline — do not explain it.
- Do not open with "You're so X that..." — that's a template, not a joke.
- No emoji, no hashtags, no asterisk actions like *laughs*.

Now roast ${currentName} using the reason above. Return ONLY the roast, nothing else.
`;

      const MODELS = ["gemini-3.7-flash", "gemini-3.5-flash-lite"];

      async function callModel(modelName, promptText) {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(promptText);
        const response = await result.response;
        return response.text();
      }

      let responseText = "";
      let lastError = null;

      for (let i = 0; i < MODELS.length; i++) {
        try {
          responseText = await callModel(MODELS[i], prompt);
          break; // success, stop trying
        } catch (err) {
          lastError = err;
          const status = err?.status ?? err?.response?.status;
          const isRetryable = status === 429 || status === 503;
          const isLastModel = i === MODELS.length - 1;

          console.warn(`${MODELS[i]} failed (status: ${status ?? "unknown"})`, err);

          if (!isRetryable || isLastModel) {
            throw lastError; // bad prompt / safety block / out of models — bail out for real
          }
          // else: loop continues to next model
        }
      }

      return responseText.replace(/^"|"$/g, '').trim();
    } catch (error) {
      console.error(error);
      return "Couldn't generate AI content right now. Try again!";
    }
  }

  async function getJoke() {
    if (!name.trim()) return

    setLoading(true)
    setShowCard(true)
    setJoke("")

    try {
      const finalReason = reason === "custom" ? customReason.trim() : reason;
      const aiText = await generateAIContent(name, finalReason);
      setJoke(aiText);
    } catch {
      setJoke("Couldn't fetch content right now. Try again!")
    } finally {
      setLoading(false)
    }
  }

  async function getNewJoke() {
    if (!name.trim()) return

    setLoading(true)
    setJoke("")

    try {
      const finalReason = reason === "custom" ? customReason.trim() : reason;
      const aiText = await generateAIContent(name, finalReason);
      setJoke(aiText);
    } catch {
      setJoke("Couldn't fetch content right now. Try again!")
    } finally {
      setLoading(false)
    }
  }

  function resetAll() {
    setName("")
    setReason("")
    setCustomReason("")
    setJoke("")
    setShowCard(false)
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 relative">
      
      {/* Immersive Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[#FF3333] opacity-[0.15] blur-[100px] md:blur-[150px] mix-blend-screen animate-breathe" />
        <div className="absolute top-[40%] -right-[20%] md:-right-[10%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] rounded-full bg-[#FF6B33] opacity-[0.1] blur-[120px] md:blur-[180px] mix-blend-screen animate-breathe" style={{ animationDelay: '5s' }} />
        <div className="absolute -bottom-[20%] left-[10%] w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] rounded-full bg-[#990000] opacity-[0.2] blur-[100px] md:blur-[120px] mix-blend-screen animate-breathe" style={{ animationDelay: '10s' }} />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center w-full relative z-10">
        <Header 
          name={name} 
          setName={setName}
          reason={reason}
          setReason={setReason}
          customReason={customReason}
          setCustomReason={setCustomReason}
          loading={loading}
          onGenerate={getJoke}
        />
      </main>

      {showCard && (
        <JokeCard 
          name={name}
          joke={joke}
          loading={loading}
          onNewJoke={getNewJoke}
          onClose={() => setShowCard(false)}
          onReset={resetAll}
        />
      )}

      <Footer />
    </div>
  )
}
