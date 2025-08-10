import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-charcoal text-white ">
      <div className="w-full flex flex-col items-center">
        <div className="w-full py-2 bg-lavender-400 rounded-t-2xl"></div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">&copy; {new Date().getFullYear()} rvn14. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/rvn14" target="_blank" rel="noopener noreferrer" className="hover:text-lavender-400 transition-colors flex items-center">
                <FaGithub size={20} />
                
              </a>
              <a href="https://www.linkedin.com/in/dasun-adithya-223844279/" target="_blank" rel="noopener noreferrer" className="hover:text-lavender-400 transition-colors flex items-center">
                <FaLinkedin size={20} />
              
              </a>
              <a href="https://x.com/DasunAdithya" target="_blank" rel="noopener noreferrer" className="hover:text-lavender-400 transition-colors flex items-center">
                <FaXTwitter size={20} />
                
              </a>
              <a href="https://www.instagram.com/_rvn_d.a.s.u.n_/#" target="_blank" rel="noopener noreferrer" className="hover:text-lavender-400 transition-colors flex items-center">
                <FaInstagram size={20} />
                
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  )
}

export default Footer
