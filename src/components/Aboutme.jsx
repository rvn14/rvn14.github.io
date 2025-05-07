import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const Aboutme = () => {



useGSAP( ()=> {
  

    gsap.fromTo("#trigger",
        {
        opacity: 0,
        fontSize: "24px",
        ease: "none",
         },
        {
        opacity: 1,
        fontSize: "50px",
        ease: "none",
        scrollTrigger: {
          trigger: '#clip',
          start: "center center",
          end: "+=800 center",
          scrub: true,
          markers: false,
        }
      })

    



  })

  // useGSAP( ()=> {
  //   gsap.from('.trigg', {
  //     y: 30, 
  //     opacity: 0,
  //     duration: 1,
  //     stagger: 0.2,
  //     scrollTrigger: {
  //       trigger: '.trigg',
  //       start: 'top bottom',
  //       end: 'top bottom',
  //       toggleActions: 'restart none reverse none',
  //       ease: 'power1.inOut',
  //       scrub: false,
  //     }
  //   });




  // } )


  return (
        <div name="about" className='about bg-gray-950 relative h-dvh w-screen overflow-x-hidden' >
          
          <img
            src="images/aboutbg2.jpg"
            alt="Background"
            className="absolute left-0 top-0 size-full object-center object-cover"
          />
          

        </div>

  )
}





export default Aboutme;