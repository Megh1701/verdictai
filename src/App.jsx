import { useState } from 'react'
import Nav from './components/nav'
import Scroll from './components/Scroll'
import Footer from './components/Footer'
import Features from './components/Features'
import './App.css'
import Bento from './components/Bento'
import Faq from './components/Faq'
import Partical from './components/Partical'
import VerdictAI from './components/Verdictai'
function App() {


  return (
    <>
      <div className='bg-black text-white min-h-screen'>
        <Nav />
        <Scroll />
        <Partical/>
        <Features />
        <Bento />
        <Faq/>
        <div className="flex-grow"></div> {/* This pushes the footer to the bottom */}
        <Footer />
  
      </div>
    </>
  )
}

export default App
