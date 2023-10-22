import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import React from 'react'
import { urlFor } from '@/client';
import { getTimeAgo } from '@/utils';
interface PostData{
    title:string;
    image:SanityImageSource;
    _createdAt:string;
  }

export default function ArticleComp({article,onClick}:{article:PostData,onClick:()=>void}) {
  return (
<div className='h-full w-full pt-2 pb-1 cursor-pointer'  onClick={onClick}>
  <img src={urlFor(article.image).url()} alt="" className="h-3/5 w-full mb-1"/>
  <div className='h-0.5 w-full bg-slate-300'></div>
  <div className='font-black tracking-wider relative w-full'>
    {article.title}
    <div className='absolute bottom-1 right-0 h-4 w-12 text-gray-500 rounded-lg z-50 text-center text-xs font-thin'>
      {getTimeAgo(article._createdAt)}
    </div>
  </div>
</div>

  )



}
