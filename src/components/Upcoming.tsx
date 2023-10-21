import React from 'react'

interface UpcomingProps{
    classname: string;
}

export default function Upcoming(props: UpcomingProps) {

  const upcoming:string[] = ["1st years CAT exams to start from tomorrow"]

  return (
    <div className={props.classname}>
    <div className=' text-xl tracking-wider font-bold border-b-2 border-y-white'>
        <span>Upcoming Events</span>
    </div>
    <div>
        {upcoming.map(ev => {
            return <div className='border-b-2  border-y-slate-700 flex flex-col' key={ev}> 
                <span className='text-sm tracking-wide'>{ev}</span>
                <span className=' text-xs text-slate-600 self-end'>2 mins ago</span>
            </div>
        })}
    </div>  
    </div>

  )
}
