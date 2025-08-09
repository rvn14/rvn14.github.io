import './App.css'
import { ReactLenis } from 'lenis/react'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Home from './components/Home'
import NavBar from './components/Navbar'
import About from './components/About'
import { Analytics } from '@vercel/analytics/react';
import PreLoader from './components/PreLoader'



function App() {
  return (
    <ReactLenis root>
      <PreLoader />
      <NavBar />
      <main className='main relative min-h-screen w-screen overflow-x-hidden'>
        <Home />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </main>
      <Analytics />
    </ReactLenis>
    )
}

export default App
