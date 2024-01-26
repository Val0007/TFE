import React from 'react'

interface NewEvent{
    title: string
    deadline:string
    description:string
}

interface NewEventProps{
    events:NewEvent[]
    show:(ev:NewEvent) => void
}

export default function NewEvents(props:NewEventProps) {


  return (
    <div className=" h-full w-full">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {props.events.map(event => {
                return <div className=' bg-slate-100 rounded-md px-2 py-2 ' onClick={()=>props.show(event)}>
                    <span className=" text-sm font-thin">Name : {event.title}</span><br></br>
                    <span className="mt-2 text-xs font-semibold">Deadline: {event.deadline}</span>
                </div>
            })}
        </div>
    </div>
  )
}
