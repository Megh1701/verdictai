import { useState } from "react";
import { Menu, X } from "lucide-react";

function Nav({ homeRef, featuresRef, servicesRef, pricingRef, faqRef }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showAuthForm, setShowAuthForm] = useState(false);

    // Function to scroll smoothly
    const scrollToSection = (ref) => {
        if (ref?.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
            setIsOpen(false); // Close mobile menu after clicking
        }
    };

    return (
        <>
            <header className="sticky top-0 w-full bg-black/50 backdrop-blur-md text-white border-b border-gray-700 shadow-md z-50">
                <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                    {/* Logo */}
                    <div className="text-xl font-bold">Verdict.ai</div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <button onClick={() => scrollToSection(homeRef)} className="hover:text-gray-400">Home</button>
                        <button onClick={() => scrollToSection(featuresRef)} className="hover:text-gray-400">Features</button>
                        <button onClick={() => scrollToSection(servicesRef)} className="hover:text-gray-400">Services</button>
                        <button onClick={() => scrollToSection(pricingRef)} className="hover:text-gray-400">Pricing</button>
                        <button onClick={() => scrollToSection(faqRef)} className="hover:text-gray-400">FAQ</button>
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
                        <button onClick={() => scrollToSection(homeRef)} className="block">Home</button>
                        <button onClick={() => scrollToSection(featuresRef)} className="block">Features</button>
                        <button onClick={() => scrollToSection(servicesRef)} className="block">Services</button>
                        <button onClick={() => scrollToSection(pricingRef)} className="block">Pricing</button>
                        <button onClick={() => scrollToSection(faqRef)} className="block">FAQ</button>
                        <button 
                            className="w-full bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                            onClick={() => setShowAuthForm(true)}
                        >
                            Get Started
                        </button>
                    </div>
                )}
            </header>
        </>
    );
}

export default Nav;
