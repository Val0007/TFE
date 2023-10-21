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
    <div className='bg-article-white h-20 grid grid-cols-10 md:h-80 md:rounded-b-md md:block overflow-hidden cursor-pointer relative' onClick={onClick}>
        <div className='hidden  md:block absolute top-1 right-1 h-4 w-10  bg-article-white text-black rounded-lg z-50 text-center text-xs'>
          {getTimeAgo(article._createdAt)}
        </div>
        <img src={urlFor(article.image).url()} alt="" className='col-span-3 h-full md:h-4/6 md:w-full ' />
        <div className='pl-1 md:p-2 col-span-7'>
        <span className='text-sm md:text-lg font-light leading-7 tracking-wider text-clip  md:w-full'>{article.title}</span>
        </div>
    </div>
  )



}
