import React from 'react'
import { YouTubePreview } from '@/components/YoutubeComp';
import { getTimeAgo } from '@/utils';

interface VideoData{
    title:string;
    url:string;
    _createdAt:string;  
  }
  

export default function VideoComp({video,click}:{video:VideoData,click:()=>void}) {
  return (
    <div className='mx-4 md:mx-0 bg-article-white h-80 rounded-b-md block overflow-hidden cursor-pointer relative' onClick={click} >
    <div className='block absolute top-1 right-1 h-4 w-10  bg-article-white text-black rounded-lg z-50 text-center text-xs'>
      {getTimeAgo(video._createdAt)}
    </div>
    {/* <img src={urlFor(article.image).url()} alt="" className='col-span-3 h-full h-4/6 w-full ' /> */}
    <YouTubePreview url={video.url} class='h-4/6 w-full'></YouTubePreview>
    <div className='pl-1 p-2 col-span-7'>
    <span className='text-lg font-light leading-7 tracking-wider text-clip  w-full'>{video.title}</span>
    </div>
</div>
  )


}
