import { useState } from "react";
import { Menu, X } from "lucide-react";
import AuthForm from "./AuthForm.jsx";

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [showAuthForm, setShowAuthForm] = useState(false);

    return (
        <>
            <header className="sticky top-0 w-full bg-black/50 backdrop-blur-md text-white border-b border-gray-700 shadow-md z-50">
                <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                    {/* Logo */}
                    <div className="text-xl font-bold">Verdict.ai</div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <a href="#" className="hover:text-gray-400">Home</a>
                        <a href="#" className="hover:text-gray-400">Features</a>
                        <a href="#" className="hover:text-gray-400">Services</a>
                        <a href="#" className="hover:text-gray-400">Pricing</a>
                    </div>

                    {/* Get Started Button */}
                    <button 
                        className="hidden md:block bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                        onClick={() => setShowAuthForm(true)}
                    >
                        Get Started
                    </button>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-black text-white py-4 px-6 space-y-4">
                        <a href="#" className="block">Home</a>
                        <a href="#" className="block">Features</a>
                        <a href="#" className="block">Services</a>
                        <a href="#" className="block">Pricing</a>
                        <button 
                            className="w-full bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                            onClick={() => setShowAuthForm(true)}
                        >
                            Get Started
                        </button>
                    </div>              )}
            </header>

         
        </>
    );
}

export default Nav;
