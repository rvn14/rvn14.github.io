import './App.css'
import { ReactLenis } from 'lenis/react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FadeInSection from './components/FadeInSection'


function App() {
  return (
    <ReactLenis root>
        <Navbar />
      <main className='main relative min-h-screen w-screen overflow-x-hidden'>
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </ReactLenis>
    )
}

export default App
