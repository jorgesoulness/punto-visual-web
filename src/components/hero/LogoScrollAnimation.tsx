"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function LogoScrollAnimation({ triggerRef }: { triggerRef: React.RefObject<HTMLElement> }) {

 const container = useRef(null)

 useEffect(() => {

  const ctx = gsap.context(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true
      }
    })

    tl.from(".logo-circle", {
      scale: 0,
      opacity: 0,
      duration: 1
    })

    tl.from(".logo-waves", {
      scale: 0,
      opacity: 0,
      duration: 1
    })

    tl.from(".logo-text", {
      y: 50,
      opacity: 0,
      stagger: 0.1
    })

  })

  return () => ctx.revert()

 }, [])

 return (
   <div ref={container} className="w-full h-full flex items-center justify-center">

      <svg viewBox="0 0 500 300" className="w-[80%]">

        <circle
          className="logo-circle"
          cx="250"
          cy="150"
          r="40"
          stroke="#CFDE00"
          strokeWidth="3"
          fill="none"
        />

        <circle
          className="logo-waves"
          cx="250"
          cy="150"
          r="60"
          stroke="#CFDE00"
          strokeWidth="2"
          fill="none"
        />

        <text
          x="120"
          y="170"
          className="logo-text"
          fill="white"
          fontSize="48"
          fontWeight="bold"
        >
          PUNTO
        </text>

      </svg>

   </div>
 )
}