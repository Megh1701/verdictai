
import { useState, useEffect, useRef } from "react"
import { ArrowRight, X } from "lucide-react"

export default function VerdictAI() {
  const [input, setInput] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orbs, setOrbs] = useState([])
  const [messages, setMessages] = useState([])
  const [activeTag, setActiveTag] = useState(null)
  const containerRef = useRef(null)
  const inputRef = useRef(null)
  const messagesEndRef = useRef(null)



  useEffect(() => {
    const newOrbs = []
    for (let i = 0; i < 15; i++) {
      newOrbs.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 150 + 50,
        speed: Math.random() * 20 + 10,
        color: getRandomBlueColor(),
      })
    }
    setOrbs(newOrbs)

    // Auto-focus the input on desktop
    if (window.innerWidth > 768 && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 1000)
    }
  }, [])

  // Animation loop for the orbs
  useEffect(() => {
    let animationId
    const startTime = Date.now()

    const animate = () => {
      const currentTime = Date.now()
      const elapsed = (currentTime - startTime) / 1000

      setOrbs((prevOrbs) =>
        prevOrbs.map((orb) => ({
          ...orb,
          x: (orb.x + Math.sin(elapsed / (orb.speed / 10)) * 0.5) % 100,
          y: (orb.y + Math.cos(elapsed / (orb.speed / 10)) * 0.5) % 100,
        })),
      )

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const getRandomBlueColor = () => {
    // Generate different shades of blue
    const hue = 200 + Math.floor(Math.random() * 40) // Blue range
    const saturation = 70 + Math.floor(Math.random() * 30)
    const lightness = 50 + Math.floor(Math.random() * 20)
    return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.15)`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: input }])
    setIsProcessing(true)

    // Simulate AI processing
    const processingTime = 1500 + Math.random() * 1500
    setTimeout(() => {
      // Add AI response
      const responses = [
        "I've analyzed your request and found some interesting insights.",
        "Here's what I discovered based on your query.",
        "I've processed your input and have several thoughts to share.",
        "That's an intriguing question. Here's what I think.",
        "I've considered multiple perspectives on your request.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      setMessages((prev) => [...prev, { type: "ai", content: randomResponse }])
      setIsProcessing(false)
      setInput("")
    }, processingTime)
  }

  const handleClear = () => {
    setMessages([])
    setInput("")
    setIsProcessing(false)
    setActiveTag(null)
    if (inputRef.current) inputRef.current.focus()
  }

  const handleTagClick = (tagId) => {
    setActiveTag(tagId)

    // Set predefined text based on the selected tag
    const tagPrompts = {
      draft: "Draft a professional email about ",
      cross: "Compare and contrast ",
      grs: "Generate a step-by-step guide for ",
    }

    setInput(tagPrompts[tagId] || "")
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white" ref={containerRef}>
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {orbs.map((orb) => (
          <div
            key={orb.id}
            className="absolute rounded-full blur-3xl"
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              background: orb.color,
              transition: "left 4s ease-in-out, top 4s ease-in-out",
            }}
          />
        ))}
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-screen flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-sm font-medium tracking-wider text-blue-300">verdict.ai</span>
          </div>

          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="rounded-full bg-gray-900/50 p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </header>

        {/* Main content area */}
        <div className="flex-1 flex flex-col justify-end overflow-hidden px-4 pb-24 pt-10">
          {/* Messages */}
          <div className="space-y-6 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-500`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800/70 text-gray-100 backdrop-blur-sm border border-gray-700/50"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex space-x-2 rounded-2xl bg-gray-800/70 px-5 py-3 backdrop-blur-sm border border-gray-700/50">
                  <div
                    className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-blue-600 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Tags */}
          {messages.length === 0 && !isProcessing && (
            <div className="mb-10 flex justify-center space-x-3">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.id)}
                  className={`rounded-full px-4 py-2 text-sm transition-all ${
                    activeTag === tag.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800/70 text-gray-300 hover:bg-gray-700 border border-gray-700/50"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent pb-8 pt-20">
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl items-end space-x-2 px-4">
            <div
              className={`relative flex-1 rounded-2xl border ${
                isActive
                  ? "border-blue-500/50 bg-gray-900/90 shadow-lg shadow-blue-500/20"
                  : "border-gray-800 bg-gray-900/70"
              } backdrop-blur-md transition-all duration-300`}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                placeholder="Ask anything..."
                rows={1}
                className="max-h-32 min-h-[56px] w-full resize-none bg-transparent py-4 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none"
                style={{
                  height: Math.min(Math.max(56, input.split("\n").length * 24), 128) + "px",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className={`flex h-14 w-14 items-center justify-center rounded-full ${
                input.trim() && !isProcessing
                  ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-700/30 hover:from-blue-500 hover:to-blue-300"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              } transition-all duration-300`}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

