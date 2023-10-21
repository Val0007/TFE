import {client} from '../client'
import { ServerResponse } from 'http';
import { useEffect } from 'react';
import NavBar from '../components/NavBar'
import VideoComp from '@/components/VideoComp';

export default function Home({data}:{data:VideoData[]}) {


  useEffect(()=>{

  },[])

  return (
    <div>
    <NavBar page="video"></NavBar>
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-col w-screen md:w-5/6 md:grid md:grid-cols-2 gap-y-4 md:gap-6 lg:grid-cols-3 lg:gap-4'>
      {data.map(post => {
        return <VideoComp video={post} key={post.title} click={()=>{
            window.open(`${post.youtubeurl}`)
        }}></VideoComp>
      })}
      </div>
    </div>
    </div>

  )
}

interface ServerSideProps{
  res:ServerResponse;
}

interface VideoData{
  title:string;
  url:string; //iframe
  _createdAt:string;
  youtubeurl:string; //url of video

}

export async function getServerSideProps({res}:ServerSideProps) {

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=59'
  )
  // Fetch data from external API
  const data:VideoData[] = await client.fetch(`*[_type == "video"]{title,url,youtubeurl}  | order(_createdAt desc)`);
  console.log(data)
  // Pass data to the page via props
  return { props: {data} }
}
// This value is considered fresh for ten seconds (s-maxage=10).
// If a request is repeated within the next 10 seconds, the previously
// cached value will still be fresh. If the request is repeated before 59 seconds,
// the cached value will be stale but still render (stale-while-revalidate=59).