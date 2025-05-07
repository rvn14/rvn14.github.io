import Button from './Button'
import { TiUser } from 'react-icons/ti'
import {useEffect} from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(CustomEase);

const customEase = CustomEase.create("custom", ".87,0,.13,1");

const Hero = () => {

  useGSAP(() => {
    
    gsap.to(".hero", {
      clipPath: "polygon(0% 45%, 15% 45%, 15% 55%, 0% 55%)",
      duration: 1.5,
      ease: customEase,
      delay: 0.5,
      onStart: () => {
        gsap.set(".hero-content", {
          opacity: 0,
          duration: 0.1,
          ease: customEase,
        });
      },
      
    })

    gsap.to(".hero", {
      clipPath: "polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)",
      duration: 2,
      ease: customEase,
      delay: 2.5,
      onComplete: () => {
        gsap.to(".hero-content", {
          opacity: 1,
          duration: 1,
          ease: customEase,
          delay: 0.5,
        });
      },
    })


    gsap.to(".hero", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: customEase,
      delay: 4.5,
      
    })

  });



  return (

    <div className='hero bg-gray-50'>
      <div className="relative h-dvh w-screen overflow-x-hidden select-none">
        
        <img
          src="/images/bg.gif"
          alt="hero-bg"
          className="object-cover h-full w-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[#ffffff05] backdrop-blur-[2px] "></div>
        <div className='hero-content'>
          <h1 className="special-font hero-heading absolute bottom-5 right-10 z-40 text-blue-100">
            DE<b>V</b>EL<b>O</b>PER
          </h1>

          <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10">
              <h1 className="special-font hero-heading text-blue-100">
                D<b>ESIGN</b>ER
              </h1>

              <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                FullStack Web Developer <br /> Graphic Designer <br /> UI/UX Designer
              </p>

              <Button
                id="contact"
                title="Let's Connect"
                leftIcon={<TiUser />}
                containerClass="bg-hero-btn flex-center gap-1"
              />
            </div>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Hero