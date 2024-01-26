import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import tfeLogo from './tfewhite.png'
import Link from 'next/link'
import { useRouter } from 'next/router'
import tfeLog from './tfeLog.png'

interface NavBarProp{
  page:string;
}

export default function NavBar(props:NavBarProp) {

  const size = useWindowSize();
  const router = useRouter()

  const width  = size.width || 768

  if(props.page == "slug"){
    return  <div className="bg-nav-black w-screen h-14 mb-6 text-white p-2 flex justify-between items-center sticky top-0">
    <div className='flex flex-row justify-center items-center cursor-pointer' onClick={() => router.push('/')}>
      <div className='mr-4'>
      <svg className=' fill-white' xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      </div>
      <span className=" text-4xl tracking-widest font-Marker">tfe</span>
    </div>
  </div>
  }


  if( width >= 768){
    return <div className="w-screen h-64 flex flex-col justify-center items-center">
    {/* <div className="w-screen flex flex-col justify-center items-center">
      <Image src={tfeLog} alt="LOGO" className="w-3/5 h-40" ></Image>
    </div> */}
    <div className="mb-8">
      <span className=" tracking-widest text-4xl font-extrabold text-8xl font-chomsky">The Fourth Estate</span>
    </div>
    <div className=' h-0.5 w-full bg-black mb-1'>
    </div>
    <div className="w-full flex flex-row border-y justify-center items-center border-nav-black py-2 mb-0.5">
        {
          props.page == "home" ? 
          <>
          <Link href="/" className=' font-rso mr-12 text-lg cursor-pointer underline decoration-slate-950 decoration-2 underline-offset-4'>News</Link>
          <Link href="/video" className=' font-rso text-lg cursor-pointer mr-12'>Media</Link>
          <Link href="/events" className='font-rso text-lg cursor-pointer'>Events</Link>
          </>
          : props.page == "video" ?
          <>
          <Link href="/" className=' font-rso mr-12 text-lg cursor-pointer'>News</Link>
          <Link href="/video" className=' font-rso text-lg cursor-pointer underline decoration-slate-950 decoration-2 underline-offset-4 mr-12'>Media</Link>
          <Link href="/events" className='font-rso text-lg cursor-pointer'>Events</Link>
          </>
          :
          <>
          <Link href="/" className=' font-rso mr-12 text-lg cursor-pointer'>News</Link>
          <Link href="/video" className=' font-rso text-lg cursor-pointer mr-12'>Media</Link>
          <Link href="/events" className='font-rso text-lg cursor-pointer underline decoration-slate-950 decoration-2 underline-offset-4'>Events</Link>
          </>

        }
      </div>
    <div className=' h-0.5 w-full bg-black mt-0.5'>
    </div>
  </div>
  }
  else{
    return (
      <div className="bg-nav-black w-screen h-14 mb-6 text-white p-2 flex justify-between items-center">
        <div>
          <span className=" text-4xl tracking-widest font-chomsky">tfe</span>
        </div>
        <div className="flex flex-row">
          {
            props.page == "home" ? 
            <>
            <Link href="/" className='font-rso mr-6 text-lg cursor-pointer underline decoration-slate-200 decoration-2 underline-offset-4'>News</Link>
            <Link href="/video" className='font-rso text-lg cursor-pointer mr-6'>Media</Link>
            <Link href="/events" className='font-rso text-lg cursor-pointer'>Events</Link>
            </>
            : props.page == "video" ?
            <>
            <Link href="/" className='font-rso mr-6 text-lg cursor-pointer '>News</Link>
            <Link href="/video" className='font-rso text-lg cursor-pointer underline decoration-slate-200 decoration-2 underline-offset-4 mr-6'>Media</Link>
            <Link href="/events" className='font-rso text-lg cursor-pointer'>Events</Link>
            </>
            :
            <>
            <Link href="/" className='font-rso mr-6 text-lg cursor-pointer '>News</Link>
            <Link href="/video" className='font-rso text-lg cursor-pointer mr-6'>Media</Link>
            <Link href="/events" className='font-rso text-lg cursor-pointer underline decoration-slate-200 decoration-2 underline-offset-4'>Events</Link>
            </>

          }
        </div>
      </div>
    )
  }




}

interface Screensize{
  width: number | undefined;
  height: number | undefined;
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<Screensize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
     
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}