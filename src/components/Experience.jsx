import  { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);


const Experience = () => {

  const [selected, setselected] = useState(null)
  const data = [
    
    
    {
        year : "2022",
        title: "STACKNET",
        description: "Joined as a full-stack developer for a startup.",
        hidden: "Just for fun and experience.",
        
    },
    {
      year : "2022",
      title: "UNIVERSITY OF KELANIYA",
      description: "Bachelor of Science in Computer Science (Hons.) Degree.",
      hidden: "Still an undergraduate student.",
    },
    {
      year : "2017",
      title: "RITS",
      description: "Member of the Richmond College IT Society",
      hidden: "Where it all started with CS.",
    },
    {
      year : "2008",
      title: "RICHMOND COLLEGE GALLE",
      description: "Completed GCE. A/Ls in Maths Stream.",
      hidden: "The beginning of a journey.",
    },
    
]


    useGSAP( ()=> {

          // gsap.from(".tline", {
        
          //   y:-100,
    
          //   scrollTrigger : {
          //     trigger: ".exp",
          //     start: 'top bottom',
          //     end: 'top top',
          //     scrub: true,
          //     markers: false,
          //   },
            
          // });
        


    })

  return (
   
    <div className="exp container relative flex bg-[#0B0C0E] w-full min-h-144 rounded-xl overflow-clip select-none">
      <div className='w-full z-2 absolute'>

      <div className='exp flex flex-col justify-center w-full h-full text-lavender-100 '>
          {data.map((item, index) => (
            <div className='flex items-center justify-between h-36 px-8 md:px-16 border-b-[1px] border-b-lavender-100/20 last:border-b-0' key={index}
            onMouseOver={() => setselected(index)}
              onMouseLeave={() => setselected(null)}
            >
              <div className='exp-year text-4xl md:text-5xl pr-4 font-outfit font-extrabold'>{item.year}</div>
              <div className='text-right flex flex-col items-end'>
                <div className='text-2xl md:text-3xl font-outfit font-black '
                  
                >{item.title}
                </div>
                <div className='exp-description text-xs md:text-base font-poppins font-light text-lavender-100/50'>{item.description}</div>
                </div>
            </div>
          ))}
        </div>

        <div className='exp flex flex-col justify-center w-full h-full descriptions text-[#0B0C0E] '>
          {data.map((item, index) => (
            <div className='flex items-center justify-between h-36 px-8 md:px-16 bg-lavender-500 description border-b-2 border-b-lavender-500 last:border-b-0' key={index}
            style={{clipPath: selected === index ? "inset(0 0 0)" : "inset(50% 0 50%"}}
            onMouseOver={() => setselected(index)}
                onMouseLeave={() => setselected(null)}
            >
              <div className='exp-year text-4xl md:text-5xl pr-4 font-outfit font-extrabold'>{item.year}</div>
              <div className='text-right flex flex-col items-end'>
              <div className='text-2xl md:text-3xl font-outfit font-black'
                
              >{item.title}
              </div>
              <div className='exp-description text-m font-poppins font-light '>{item.hidden}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      

    </div>
  )
}

export default Experience