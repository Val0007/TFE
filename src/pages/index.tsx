import {client} from '../client'
import { ServerResponse } from 'http';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import ArticleComp from '../components/ArticleComp'
import { useRouter } from 'next/router'
import NavBar from '../components/NavBar'
import Header3 from '../components/Headers/Header3'
import { useWindowSize } from '@/utils';


export default function Home({data}:{data:PostData[]}) {

  const router = useRouter()
  const size = useWindowSize();
  const width  = size.width || 768
  const compCopy = excludeElements(data,[0,1,2]) 

  function excludeElements(arr:PostData[], indicesToExclude:Number[]) {
    return arr.filter((_, index) => !indicesToExclude.includes(index));
  }


  return ( 
    <div>
    <NavBar page="home"></NavBar>
    <div className="w-full flex flex-col justify-center items-center">
    <div className="lg:w-4/6 w-screen">
      {/* {width >= 1024 ? 
      <>
      <Header3 data={data.slice(0,3)} ></Header3>
      <div className='lg:px-2  px-4 flex flex-col w-screen md:w-full md:grid gap-y-6 md:gap-y-4 md:gap-6 md:grid-cols-3 md:mt-6'>
      {compCopy.map(post => {
        return <ArticleComp article={post} key={post.title} onClick={()=>{
          router.push(`/${post.title}`)
        }}></ArticleComp>
      })}
      </div> 
      </>
       : 
       <div className='lg:px-2  px-4 flex flex-col w-screen md:w-full md:grid gap-y-6 md:gap-y-4 md:gap-6 md:grid-cols-3 md:mt-6'>
       {data.map(post => {
         return <ArticleComp article={post} key={post.title} onClick={()=>{
           router.push(`/${post.title}`)
         }}></ArticleComp>
       })}
       </div> 
      
      } */}
      <div className='lg:px-2  px-4 flex flex-col w-screen md:w-full md:grid gap-y-6 md:gap-y-4 md:gap-6 md:grid-cols-3 md:mt-6'>
       {data.map(post => {
         return <ArticleComp article={post} key={post.title} onClick={()=>{
           router.push(`/${post.title}`)
         }}></ArticleComp>
       })}
       </div> 

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