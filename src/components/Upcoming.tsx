import { getTimeAgo } from '@/utils';
import React, { useEffect } from 'react'

interface UpcomingProps{
    classname: string;
    data:Bytes[];
}

interface Bytes{
    title:string
    _createdAt:string;

}



export default function Upcoming(props: UpcomingProps) {

    useEffect(()=>{
    })
    return (
      <div className={props.classname}>
      <div>
          {props.data.map(ev => {
              return <div className='border-b-2  border-y-slate-400 flex flex-col h-20 md:h-14 mb-2 overflow-y-auto' key={ev.title}> 
                  <div className='px:0 w-full text-xs md:text-base  tracking-wide h-3/4 md:w-3/4  md:px-4'>{ev.title}</div>
                  <span className=' text-xs text-slate-600 self-end '>{getTimeAgo(ev._createdAt)}</span>
              </div>
          })}
      </div>  
      </div>

  )
}
