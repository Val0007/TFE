import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import React from 'react'
import { urlFor } from '@/client';
import { getTimeAgo } from '@/utils';
import { useRouter } from 'next/router'


interface PostData{
    title:string;
    image:SanityImageSource;
    _createdAt:string;
}

interface HeaderProp{
    data:PostData[];
}

export default function Header3(props: HeaderProp) {

  const router = useRouter()


  return (
    <div className="w-full h-108 overflow-clip">
        <div className='flex flex-row h-full w-full overflow-clip'>
            <div className='w-3/5  h-full px-8 py-8 overflow-clip cursor-pointer' onClick={()=>{router.push(`/${props.data[0].title}`)}} >
            <img src={urlFor(props.data[0].image).url()} alt="" className="h-4/5 w-full mb-3"/>
            <div className=' font-black tracking-wider text-2xl'>
            {props.data[0].title} dsnksdnjvsvndejfvnedsjfvnkdjsnvd 

            </div> 
            </div>
            <div className='flex flex-col w-2/5'>
                <div className='h-1/2 w-full  px-12 pt-2 pb-1 cursor-pointer' onClick={()=>{router.push(`/${props.data[1].title}`)}}>
                <img src={urlFor(props.data[1].image).url()} alt="" className="h-3/5 w-full mb-1"/>
                <div className=' h-0.5 w-full bg-slate-300'></div>
                <div className=' font-black tracking-wider relative'>
                {props.data[1].title} wins against PTM
                <div className='absolute bottom-1 right-0 h-4 w-12 text-gray-500 rounded-lg z-50 text-center text-xs font-thin'>
                {getTimeAgo(props.data[1]._createdAt)}
                </div>
                </div>
                </div>

                <div className='h-1/2 w-full px-12 pt-2 pb-1 cursor-pointer' onClick={()=>{router.push(`/${props.data[2].title}`)}}>
                <img src={urlFor(props.data[2].image).url()} alt="" className="h-3/5 w-full mb-1"/>
                <div className=' h-0.5 w-full bg-slate-300'></div>
                <div className=' font-black tracking-wider relative w-full'>
                {props.data[2].title}
                <div className='absolute bottom-1 right-0 h-4 w-12 text-gray-500 rounded-lg z-50 text-center text-xs font-thin'>
                {getTimeAgo(props.data[2]._createdAt)}
                </div>
                </div>
                </div>

            </div>
        </div>
      </div>
  )
}

{/* <div className='hidden  md:block absolute top-1 right-1 h-4 w-10  bg-article-white text-black rounded-lg z-50 text-center text-xs'>
{getTimeAgo(article._createdAt)}
</div> */}
{/* <div className="col-span-7 bg-yellow-200">
<div className='w-full bg-red-400 p-4'>

</div>
</div>
<div className="col-span-3">
<div className="grid grid-rows-2 h-full">
<div className=' bg-blue-200 row-span-1'>
    Article 2
</div>
<div className=" bg-orange-300 row-span-1">
    Article 3
</div>
</div>
</div> */}