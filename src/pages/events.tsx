import React, { useState } from 'react'
import NavBar from '@/components/NavBar'
import Recents from '@/components/Recent'
import Upcoming from '@/components/Upcoming'
import EventSwitch from '@/components/EventSwitch'
import { ServerResponse } from 'http'
import { client } from '@/client'

export default function Events({recentData,upcomingData}:{recentData:Bytes[],upcomingData:Bytes[]}) {

  const [upcomingevent,setEvent] = useState(false)


  return (
    <div className="flex flex-col h-screen w-screen">
        <NavBar page='events'></NavBar>   
        <EventSwitch recentClick={() => {setEvent(false);}}  isUpcoming={upcomingevent}
                    upcomingClick={() => {
                                    setEvent(true);
                                }}></EventSwitch>
            
            <div className='flex flex-grow p-4 justify-center overflow-y-auto mt-4 md:max-h-60 lg:max-h-80'>
                {!upcomingevent ? 
                                <Recents classname="" data={recentData}></Recents>
                                :
                                <Upcoming classname="" data={upcomingData}></Upcoming>
                }

            </div>
    </div>
  )
}

interface ServerSideProps{
    res:ServerResponse;
}

interface Bytes{
    title:string
    _createdAt:string;

}


export async function getServerSideProps({res}:ServerSideProps) {

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=59'
    )
    // Fetch data from external API
    const recentData:Bytes[] = await client.fetch(`*[_type == "recent"]{title,_createdAt}  | order(_createdAt desc) [0...10]`);
    const upcomingData:Bytes[] = await client.fetch(`*[_type == "upcoming"]{title,_createdAt}  | order(_createdAt desc) [0...10]`);
    console.log("fetching bytes")
  
    // Pass data to the page via props
    return { props: {recentData,upcomingData} }
  }
