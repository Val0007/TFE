import React, { useEffect, useState } from 'react'
import p1 from './tfeLog.png'
import p2 from './tfeLogo.png'
import p3 from './tfewhite.png'
import { StaticImageData } from 'next/image'
import Image from 'next/image'
import { SanityClientLike, SanityImageSource, SanityModernClientLike, SanityProjectDetails } from '@sanity/image-url/lib/types/types'
import urlBuilder from "@sanity/image-url";

//type builder = (options?: SanityClientLike | SanityProjectDetails | SanityModernClientLike) => ImageUrlBuilder
// {
//   asset: {
//     _type: 'reference',
//     _ref: 'image-00b6f65662f624c836c625bc94fd650fe63d7172-2048x1365-jpg'
//   },
//   _type: 'image',
//   _key: '10fa57e01293'
// },

interface PhotoViewerProps{
  images:SanityImageSource[]
}


export default function PhotoViewer(props:PhotoViewerProps) {

  const [imgIndex,setIndex] = useState(0)
  const timeoutRef = React.useRef(null);
  const imageBuilder = urlBuilder({
    projectId: "61g49341", // Replace with your Sanity project ID
    dataset: "production", // Replace with your Sanity dataset
  });

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(()=>{
   console.log(props.images)
   timeoutRef.current = setInterval(()=>{
        setIndex(prev => {
            if(prev < props.images.length - 1){
                return prev + 1
            }
            return 0
        }) 
    },3000)
    return () => {
        resetTimeout();
      };
  },[imgIndex])

  return (
    <div id="slideshow" className="w-full h-full overflow-hidden">
      {/* classname translate would not work => nextjs problem */}
        <div id="slideshowSlider" className={`transition-all duration-1000 whitespace-nowrap w-full h-5/6 `} style={{transform:`translateX(-${imgIndex*100}%)`}}>
            {props.images.map((img,i) => {
                return <Image key={i} src={imageBuilder.image(img).url()} alt="" className='h-5/6 w-full inline-block' width={400} height={200}></Image>
            })}
        </div>
        <div id="slideshowdots" className='flex w-full justify-center mt-2'>
           {
            Array.from(Array(props.images.length), (_, i) => {
                return <div key={i} className={`h-4 w-4 transition-all duration-1000 rounded-full mr-4 cursor-pointer ${imgIndex == i ? " bg-black" : " bg-slate-500"}`}
                onClick={()=>{
                    setIndex(i)
                }}
                ></div>
            })
           }
        </div>

    </div>
  )
}
