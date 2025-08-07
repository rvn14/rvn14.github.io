import AnimatedTitle from "./AnimatedTitle"
import ShinyText from "./ShinyText"
import Waves from "./Waves"


const Home = () => {
  return (
    <main className="w-full min-h-dvh bg-black">
      {/* HERO SECTION */}
      <section className="relative h-[50vh] md:h-dvh flex flex-col items-center justify-center overflow-hidden">
        {/* Aurora Video BG */}
        {/* <video
          src="/video/Aurora.mp4"
          autoPlay
          loop
          muted
          className="absolute inset-0 object-cover blur-md w-full h-full scale-103 z-0"
        /> */}
        <video
          src="/video/video.mp4"
          autoPlay
          loop
          muted
          className="absolute inset-0 object-cover object-bottom w-full h-[50vh] md:h-dvh scale-103 z-0 mix-blend-screen opacity-95"
        />

        {/* Waves Overlay */}
        <div className="absolute w-full inset-0 z-1 opacity-5 pointer-events-none">
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

        {/* HERO CONTENT */}
        <div className="font-outfit font-extrabold text-[60px] sm:text-[64px] md:text-[96px] lg:text-[128px] text-white z-10 flex flex-col items-center justify-center leading-[0.8] px-2 sm:px-0 select-none mt-10 md:-mt-20 mix-blend-hard-light w-full h-fit">
          <p className="text-lavender-200 bg-gradient-to-r from-transparent via-lavender-100/10 to-transparent tracking-widest z-10 text-center text-xs md:text-base font-light mt-4 mb-4 py-1 px-3 shadow-lg backdrop-blur-[2px] rounded-4xl">
            “Turning creative ideas into digital experiences.”
          </p>
          <h1 className="bg-gradient-to-r from-transparent via-lavender-300 to-transparent bg-clip-text text-transparent backdrop-blur-[1px]">
            IMAGINE
          </h1>
          <h1 className="bg-gradient-to-r from-lavender-400/30 via-lavender-200 to-lavender-400/30 bg-clip-text text-transparent backdrop-blur-[1px]">
            DESIGN
          </h1>
          <h1 className="bg-gradient-to-r from-transparent via-lavender-300 to-transparent bg-clip-text text-transparent backdrop-blur-[1px]">
            {'<DEVELOP/>'}
          </h1>
          
        </div>
      </section>

      {/* ABOUT/INFO SECTION */}
      <section className="flex flex-col items-center text-lavender-100 relative pb-4">
        
        

        {/* --- MAIN CARD --- */}
        <div className="w-full max-w-6xl min-h-100 h-full bg-[#0B0C0E] rounded-2xl z-10  shadow-[0px_-5px_40px_6px_rgba(204,182,247,0.25)] flex flex-col items-center p-4 relative">
          <div className="absolute -bottom-8 w-screen h-2/3 bg-gradient-to-t from-black via-black to-transparent pointer-events-none z-10"></div>
          <div className="z-10 w-full flex items-center text-center justify-center mb-4 select-none">
            <ShinyText
              text="Welcome to My Portfolio!"
              disabled={false}
              speed={5}
              className="font-general text-sm uppercase md:text-[12px] text-center"
            />

          </div>
          <div className="flex flex-col items-center inset-0 z-10 w-full  rounded-2xl md:relative">
            <div className="flex flex-col items-center justify-center rounded-xl overflow-hidden z-10">
              <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-black via-black to-transparent pointer-events-none z-10"></div>
              <img src="images/aboutbg2.jpg" alt="" className="scale-102" />
              <div className="absolute bottom-0 z-30 flex flex-col items-center justify-center w-full">
                <AnimatedTitle
                  title="GRAPHIC <b>DES</b>IGNER &<br />FULLSTACK <b>WEB</b> DEVELOPER"
                  containerClass="mt-2 text-lavender-100! font-light text-center text-3xl md:text-7xl"
                />
                <div className="flex flex-col items-center justify-center text-center mt-4">
                  <p className="font-semibold text-lg">
                    Hi! my name is <span className="text-lavender-400">Dasun Adithya</span>
                  </p>
                  <p className="text-gray-300 w-2/3">
                    <span>
                      I am a <span className="text-lavender-400 font-semibold">Computer Science</span> undergraduate with strong coding skills and a passion for designing websites, interfaces, and graphics.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
      </section>
    </main>
  );
};

export default Home;
