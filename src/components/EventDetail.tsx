import React from 'react'

interface EventDetailProp{
    name: string
    deadline:string
    description:string
    link:string
    show:boolean
    close:()=>void
}

export default function EventDetail(props:EventDetailProp) {
  return (
    <div className={`bg-transparent h-full w-full absolute top-10 z-50  justify-center items-center ${props.show ? "flex" : "hidden"}`}>
        <div className="h-4/5 w-4/5 bg-nav-black relative rounded">
            <button className="absolute top-2 right-3 text-white text-2xl" onClick={props.close}>X</button>
            <div className="text-white pt-14 px-4">
                <div className="">Event : {props.name}</div>
                <div className="mt-4 font-light font-serif">Deadline : {props.deadline}</div>
                <span className="block mt-4 font-light font-serif">Description:<br></br></span>
                <div className=' overflow-y-auto h-72  text-sm'>
                    {props.description}
                </div>
                <div className='mt-4 text-sm'>
                    Link : <a className=' text-xs break-words text-blue-400' href={props.link}>{props.link}</a>
                </div>
            </div>
        </div>
    </div>
  )
}
