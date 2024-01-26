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
    <div className="px-6 md:p-0 ">
      <div className='h-full pt-2 pb-1 cursor-pointer relative'  onClick={onClick}>
      <div className='block absolute top-3 right-1 h-4 w-10  bg-article-white text-black rounded-lg z-50 text-center text-xs'>
      {getTimeAgo(article._createdAt)}
    </div>
  <img src={urlFor(article.image).url()} alt="" className="h-3/5 w-full mb-1"/>
  <div className='h-0.5 w-full bg-slate-300'></div>
  <div className='font-light tracking-wider w-full px-2 lg:px-0'>
    {article.title}
    {/* <div className='absolute -bottom-0 -right-8  h-4 w-14 text-gray-500 rounded-lg z-50 text-center text-xs font-thin'>
      {getTimeAgo(article._createdAt)}
    </div> */}
    </div>
  </div>
    </div>

  )



}
