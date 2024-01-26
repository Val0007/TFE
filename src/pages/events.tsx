import React, { useState } from 'react'
import NavBar from '@/components/NavBar'
import Recents from '@/components/Recent'
import EventSwitch from '@/components/EventSwitch'
import EventDetail from '@/components/EventDetail'
import { ServerResponse } from 'http'
import { client } from '@/client'
import NewEvents from '@/components/NewEvents'

export default function Events({recentData,newEvents}:{recentData:Bytes[],newEvents:NewEvent[]}) {

  const [upcomingevent,setEvent] = useState(false)
  const [showEvent,setShow] = useState(false)
  const closeEvent = () => setShow(false)
  const [selectedEvent,setSelectedEvent] = useState<NewEvent>(undefined)

  function selectEvent(ev:NewEvent) {
    setSelectedEvent(ev)
    setShow(true)
  }


  return (
    <div className="flex flex-col h-screen w-screen relative">
        <NavBar page='events'></NavBar>   
        <EventSwitch recentClick={() => {setEvent(false);}}  isUpcoming={upcomingevent}
                    upcomingClick={() => {
                                    setEvent(true);
                                }}></EventSwitch>
            
            <div className='flex flex-grow p-4 justify-center overflow-y-auto mt-4 md:max-h-60 lg:max-h-80'>
                {!upcomingevent ? 
                                <Recents classname="" data={recentData}></Recents>
                                :
                                // <Upcoming classname="" data={upcomingData}></Upcoming>
                                <NewEvents events={newEvents} show={selectEvent}></NewEvents>
                }

            </div>
          {selectedEvent ?  <EventDetail name={selectedEvent.title} deadline={selectedEvent.deadline} description={selectedEvent.description} link={selectedEvent.link} show={showEvent} close={closeEvent} ></EventDetail>
            : null
          }
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

interface NewEvent{
  title: string
  deadline:string
  description:string
  link:string;
}


export async function getServerSideProps({res}:ServerSideProps) {

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=59'
    )
    // Fetch data from external API
    const recentData:Bytes[] = await client.fetch(`*[_type == "recent"]{title,_createdAt}  | order(_createdAt desc) [0...10]`);
    //const upcomingData:Bytes[] = await client.fetch(`*[_type == "upcoming"]{title,_createdAt}  | order(_createdAt desc) [0...10]`);
    const newEvents:NewEvent[] = await client.fetch(`*[_type == "newevents"]{title,deadline,description,link}  | order(_createdAt desc) [0...10]`);
    console.log("fetching bytes")
  
    // Pass data to the page via props
    return { props: {recentData,newEvents} }
  }
