import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

export default function VerdictAI() {
    const [input, setInput] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [messages, setMessages] = useState([]);
    const [orbs, setOrbs] = useState([]);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Placeholder Text Animation
    const searchOptions = ["GRS", "Drafting", "Legal Query"];
    const [searchTextIndex, setSearchTextIndex] = useState(0);
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    // Generate random orbs for background
    useEffect(() => {
        const newOrbs = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 150 + 50,
            speed: Math.random() * 20 + 10,
            color: getRandomBlueColor(),
        }));
        setOrbs(newOrbs);

        // Auto-focus the input on desktop
        if (window.innerWidth > 768 && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 1000);
        }
    }, []);

    // Animation loop for orbs
    useEffect(() => {
        let animationId;
        const animate = () => {
            setOrbs((prevOrbs) =>
                prevOrbs.map((orb) => ({
                    ...orb,
                    x: (orb.x + Math.sin(orb.speed / 100)) % 100,
                    y: (orb.y + Math.cos(orb.speed / 100)) % 100,
                }))
            );
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Placeholder text animation
    useEffect(() => {
        const interval = setInterval(() => {
            setSearchTextIndex((prevIndex) => (prevIndex + 1) % searchOptions.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Generate random blue color
    const getRandomBlueColor = () => {
        const hue = 200 + Math.floor(Math.random() * 40);
        const saturation = 70 + Math.floor(Math.random() * 30);
        const lightness = 50 + Math.floor(Math.random() * 20);
        return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.15)`;
    };

    // Handle message submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || isProcessing) return;

        setMessages((prev) => [...prev, { type: "user", content: input }]);
        setIsProcessing(true);
        setShowPlaceholder(true); // Reset placeholder after submission

        setTimeout(() => {
            const responses = [
                "I've analyzed your request and found some insights.",
                "Here's what I discovered based on your query.",
                "That's an intriguing question. Here's what I think.",
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            setMessages((prev) => [...prev, { type: "ai", content: randomResponse }]);
            setIsProcessing(false);
            setInput("");
        }, 2000);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
            {/* Background orbs */}
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

            <div className="relative z-10 flex h-screen flex-col">
                <header className="flex items-center justify-between p-16">
                    <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-2xl font-medium tracking-wider text-blue-300">Verdict.ai</span>
                    </div>
                    {messages.length > 0 && (
                        <button
                            onClick={() => setMessages([])}
                            className="rounded-full bg-gray-900/50 p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </header>

                {/* Messages */}
                <div className="flex-1 flex flex-col justify-end overflow-hidden px-4 pb-24 pt-10">
                    <div className="space-y-6 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-800/70 text-gray-100"}`}>
                                    {message.content}
                                </div>
                            </div>
                        ))}
                        {isProcessing && (
                            <div className="flex justify-start">
                                <div className="flex space-x-2 rounded-2xl bg-gray-800/70 px-5 py-3">
                                    <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"></div>
                                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"></div>
                                    <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent pb-8 pt-20">
                    <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl items-end space-x-2 px-4">
                        <div className={`relative flex-1 rounded-2xl border border-gray-800 bg-gray-900/70`}>
                        
                            {/* Animated Search Placeholder */}
                            {showPlaceholder && !input && (
                                <div className="absolute left-4 top-4 text-gray-500 pointer-events-none flex space-x-1">
                                    <span className="text-gray-500">Search for</span>
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={searchOptions[searchTextIndex]}
                                            initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                            exit={{ opacity: 0, filter: "blur(8px)", y: -10 }}
                                            transition={{ duration: 0.8, ease: "easeInOut" }}
                                            className="text-white"
                                        >
                                            {searchOptions[searchTextIndex]}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                            )}
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    setShowPlaceholder(e.target.value.trim() === "");
                                }}
                                onFocus={() => setIsActive(true)}
                                onBlur={() => setIsActive(false)}
                                onKeyDown={handleKeyDown}
                                className="w-full resize-none overflow-hidden bg-transparent py-4 pl-4 pr-12 text-white placeholder-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                                style={{ height: Math.min(Math.max(56, input.split("\n").length * 24), 128) + "px" }}
                            />

                        </div>
                        <button type="submit" className="h-14 w-14 bg-blue-600 rounded-full text-white flex justify-center items-center">
                            <ArrowRight />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
