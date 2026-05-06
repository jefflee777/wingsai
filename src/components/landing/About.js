"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { IoCompassOutline } from "react-icons/io5";

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.3em] mt-[0.1em]">
      {children}
    </motion.span>
  );
};

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const content = [
    { text: "Wings", type: "dark" },
    { text: "is", type: "dark" },
    { text: "a", type: "dark" },
    { text: "next-gen", type: "dark" },
    { type: "badge-3x" },
    { text: "platform", type: "dark" },
    { text: "that", type: "dark" },
    { text: "transforms", type: "dark" },
    { text: "your", type: "dark" },
    { text: "trips", type: "dark" },
    { text: "into", type: "dark" },
    { text: "seamless,", type: "light" },
    { type: "badge-compass" },
    { text: "rewarding", type: "light" },
    { text: "adventures.", type: "light" },
  ];

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="py-32 md:py-48 px-6 w-full flex items-center justify-center bg-white overflow-hidden"
    >
      <div className="max-w-[1000px] mx-auto text-center">
        <h2 
          className="text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] font-[family-name:var(--font-display)] font-extrabold tracking-tight leading-[1.1] md:leading-[1.05]"
        >
          {content.map((item, i) => {
            const step = 1 / content.length;
            const start = i * step;
            const end = start + step;
            
            if (item.type === "badge-3x") {
               return (
                 <Word key={i} progress={scrollYProgress} range={[start, end]}>
                   <span className="inline-flex items-center justify-center bg-gradient-to-b from-[#4AC8F5] to-[#007DF0] text-white px-4 pt-1 pb-1 md:px-6 md:pt-2 md:pb-2 rounded-[12px] md:rounded-[24px] shadow-[0_10px_20px_rgba(0,125,240,0.3)] mx-1 align-baseline relative top-[-4px] md:top-[-8px]">
                     <span className="text-[0.7em] font-black leading-none mt-1">3x</span>
                   </span>
                 </Word>
               )
            }
            
            if (item.type === "badge-compass") {
               return (
                 <Word key={i} progress={scrollYProgress} range={[start, end]}>
                   <span className="inline-flex items-center justify-center bg-gradient-to-tr from-[#FF9A9E] via-[#FECFEF] to-[#FF9A9E] text-white px-3 py-2 md:px-5 md:py-3 rounded-[12px] md:rounded-[24px] shadow-[0_10px_20px_rgba(255,154,158,0.3)] mx-1 align-baseline relative top-[-2px] md:top-[-6px]">
                     <IoCompassOutline className="text-[0.8em] stroke-[4]" />
                   </span>
                 </Word>
               )
            }

            const className = item.type === "light" ? "text-gray-400" : "text-[#0A0A0C]";
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                <span className={className}>{item.text}</span>
              </Word>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
