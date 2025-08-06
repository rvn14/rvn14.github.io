import AnimatedTitle from "./AnimatedTitle"
import ShinyText from "./ShinyText"
import Waves from "./Waves"

const Home = () => {
  return (
    <main className='w-full min-h-dvh bg-black'>
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            </div>
            <div className="absolute w-full inset-0 bg-black z-1 opacity-10 ">
              <Waves
                  lineColor="#fff"
                  backgroundColor="rgba(255, 255, 255, 0)"
                  waveSpeedX={0.02}
                  waveSpeedY={0.01}
                  waveAmpX={40}
                  waveAmpY={20}
                  friction={0.9}
                  tension={0.01}
                  maxCursorMove={120}
                  xGap={12}
                  yGap={36}
                />
            </div>
            
            <video src="/video/Aurora.mp4" autoPlay loop muted className="absolute inset-0 object-cover w-full h-full blur-md scale-103 z-0" />
            <div className="font-outfit font-extrabold text-[60px] sm:text-[64px] md:text-[96px] lg:text-[128px] text-white z-10 flex flex-col items-center justify-center leading-[0.8] px-2 sm:px-0 select-none -mt-20">
                <h1 className="">IMAGINE</h1>
                <h1 className="">DESIGN</h1>
                <h1 className="">{'<DEVELOP/>'}</h1>
            </div>
        </section>
        <section className="flex flex-col items-center justify-center min-h-screen text-white relative">
            <div className="w-full max-w-6xl min-h-120 bg-[#0B0C0E] rounded-2xl z-2 -mt-100 shadow-[0px_-5px_40px_6px_rgba(204,182,247,0.30)] flex flex-col items-center p-4 relative overflow-clip">
              <div className="z-2 w-full text-center mb-4 select-none"> 
                  <ShinyText text="Welcome to My Portfolio!" disabled={false} speed={5} className='font-general text-sm uppercase md:text-[12px]' />
              </div>
              <div className="flex flex-col items-center inset-0 z-2 w-full h-full rounded-2xl relative">
                <div className="flex flex-col items-center justify-center rounded-xl overflow-hidden ">
                  <img src="images/aboutbg2.jpg" alt="" className="scale-102"/>
                </div>    
              </div>
            </div>


            <div className="absolute inset-0 flex flex-col items-center justify-center z-3">
              <AnimatedTitle
                          title="GRAPHIC <b>DES</b>IGNER & <br /> FULLSTACK <b>WEB</b> DEVELOPER"
                          containerClass="mt-2 text-white! font-light text-center"
              />
              <div className="flex flex-col items-center justify-center text-center mt-4">
                <p className="font-semibold text-lg">Hi! my name is Dasun Adithya</p>
                <p className="text-gray-300 w-2/3">
                <span>I am a <span className ="text-[#b08ef5]" >Computer Science</span> undergraduate with strong coding skills and a passion for designing websites, interfaces, and graphics.</span>
                </p>
              </div>

            </div>


            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black via-black to-transparent z-2"></div>
            
        </section>

    </main>
  )
}

export default Home