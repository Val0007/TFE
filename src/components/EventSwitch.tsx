import React from 'react'

interface EventSwitchProp{
    recentClick:()=>void;
    upcomingClick:()=>void;
    isUpcoming:boolean;
}

export default function EventSwitch(props:EventSwitchProp) {
  const upclassName  = props.isUpcoming ? "text-xs md:text-lg underline decoration-black underline-offset-4 cursor-pointer bg-nav-black px-2 py-1 text-white" : "text-xs md:text-lg cursor-pointer"
  const recentClassName = !props.isUpcoming ? "text-xs md:text-lg underline decoration-black underline-offset-4 cursor-pointer bg-nav-black px-2 py-1 text-white" : "text-xs md:text-lg cursor-pointer"
  return (
    <div className="w-full">
    <div className="flex flex-row justify-center items-center h-full w-full mt-2 gap-x-8 text-lg tracking-wider">
        <div className={recentClassName} onClick={props.recentClick}>
            Recent Bytes
        </div>
        <div className=" h-full w-0.5 bg-black"></div>
        <div className={upclassName} onClick={props.upcomingClick}>
            Upcoming Events
        </div>
    </div>
    </div>

  )
}
