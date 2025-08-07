import './App.css'
import { ReactLenis } from 'lenis/react'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Home from './components/Home'
import NavBar from './components/Navbar'
import About from './components/About'



function App() {
  return (
    <ReactLenis root>
      <NavBar/>
      <main className='main relative min-h-screen w-screen overflow-x-hidden'>
        <Home />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </ReactLenis>
    )
}

export default App
