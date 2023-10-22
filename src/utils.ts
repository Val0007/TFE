import { useEffect, useState } from "react";

export function getTimeAgo(dateString:string) {
    // Parse the date-time string into a Date object
    const date:any = new Date(dateString);
  
    // Get the current date and time
    const currentDate:any = new Date();
  
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = currentDate - date;
  
    // Convert milliseconds to days
    const daysAgo = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
    // Calculate the remaining hours
    const hoursAgo = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
    if (daysAgo > 0) {
      return daysAgo + " days";
    } else if (hoursAgo > 0) {
      return hoursAgo + " hours";
    } else {
      return "1hr";
    }
  }


  interface Screensize{
    width: number | undefined;
    height: number | undefined;
  }
  
  // Hook
export function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<Screensize>({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      // only execute all the code below in client side
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      // Add event listener
      window.addEventListener("resize", handleResize);
       
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }  