import { NextRequest, NextResponse } from 'next/server'
import {client} from '../client'
import { ServerResponse } from 'http';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useEffect } from 'react';
import ArticleComp from '../components/ArticleComp'
import { useRouter } from 'next/router'
import NavBar from '../components/NavBar'
import Upcoming from '@/components/Upcoming';
import Recents from '@/components/Recent';

export default function Home({data}:{data:PostData[]}) {

  const router = useRouter()


  useEffect(()=>{

  },[])

  return (
    <div>
    <NavBar page="home"></NavBar>
    <div className='flex flex-col justify-center items-center relative'>
    <Upcoming classname='hidden lg:block bg-nav-black text-white absolute top-0 right-0 w-1/6 h-96 overflow-y-auto rounded-l-lg '></Upcoming>
    <Recents classname='hidden lg:block bg-nav-black text-white absolute top-0 left-0 w-1/6 h-96 overflow-y-auto rounded-r-lg'></Recents>
      <div className='lg:px-2 flex flex-col w-screen md:w-4/6 md:grid md:grid-cols-2 gap-y-4 md:gap-6 lg:grid-cols-3 lg:gap-4 '>
      {data.map(post => {
        return <ArticleComp article={post} key={post.title} onClick={()=>{
          router.push(`/${post.title}`)
        }}></ArticleComp>
      })}
      </div>
    </div>
    </div>

  )
}

interface ServerSideProps{
  res:ServerResponse;
}

interface PostData{
  title:string;
  image:SanityImageSource;
  _createdAt:string;

}

export async function getServerSideProps({res}:ServerSideProps) {

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=59'
  )
  // Fetch data from external API
  const data:PostData[] = await client.fetch(`*[_type == "article"]{title,image,_createdAt}  | order(_createdAt desc)`);
  console.log("fetching articles")

  // Pass data to the page via props
  return { props: {data} }
}
// This value is considered fresh for ten seconds (s-maxage=10).
// If a request is repeated within the next 10 seconds, the previously
// cached value will still be fresh. If the request is repeated before 59 seconds,
// the cached value will be stale but still render (stale-while-revalidate=59).