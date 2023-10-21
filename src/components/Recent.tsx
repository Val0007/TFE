import React from 'react'

interface RecentProps{
    classname: string;
}

export default function Recents(props: RecentProps) {

  const upcoming:string[] = ["Svce gets off to an amazing start today beating St Joseph's in the zonals by 62 runs"
]

  return (
    <div className={props.classname}>
    <div className=' text-xl tracking-wider font-bold border-b-2 border-y-white'>
        <span>Recent Bytes</span>
    </div>
    <div>
        {upcoming.map(ev => {
            return <div className='border-b-2  border-y-slate-700 flex flex-col' key={ev}> 
                <span className='text-sm tracking-wide'>{ev}</span>
                <span className=' text-xs text-slate-600 self-end'>2d ago</span>
            </div>
        })}
    </div>  
    </div>

  )
}
