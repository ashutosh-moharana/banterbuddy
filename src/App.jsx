import { useState } from "react"
import Header from "./components/Header"
import JokeCard from "./components/JokeCard"
import EmptyState from "./components/EmptyState"
import Footer from "./components/Footer"

export default function App() {
  const [name, setName] = useState("")
  const [joke, setJoke] = useState("")
  const [loading, setLoading] = useState(false)
  const [showCard, setShowCard] = useState(false)

  async function getJoke() {
    if (!name.trim()) return

    setLoading(true)
    setShowCard(true)
    setJoke("")

    try {
      const res = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
      })
      const data = await res.json()
      setJoke(data.joke)
    } catch {
      setJoke("Couldn't fetch a joke right now. Try again!")
    } finally {
      setLoading(false)
    }
  }

  async function getNewJoke() {
    if (!name.trim()) return

    setLoading(true)
    setJoke("")

    try {
      const res = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
      })
      const data = await res.json()
      setJoke(data.joke)
    } catch {
      setJoke("Couldn't fetch a joke right now. Try again!")
    } finally {
      setLoading(false)
    }
  }

  function resetAll() {
    setName("")
    setJoke("")
    setShowCard(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#001BB7] via-[#0046FF] to-[#001BB7]">
      <Header 
        name={name} 
        setName={setName} 
        loading={loading} 
        onGenerate={getJoke} 
      />
      
      <main className="flex-1 container mx-auto px-4 py-4 md:py-8 overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          {showCard ? (
            <JokeCard 
              name={name} 
              joke={joke} 
              loading={loading} 
              onNewJoke={getNewJoke}
              onClose={() => setShowCard(false)}
              onReset={resetAll}
            />
          ) : (
            <EmptyState />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}