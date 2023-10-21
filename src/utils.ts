export function getTimeAgo(dateString:string) {
    // Parse the date-time string into a Date object
    const date = new Date(dateString);
  
    // Get the current date and time
    const currentDate = new Date();
  
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = currentDate - date;
  
    // Convert milliseconds to days
    const daysAgo = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
    // Calculate the remaining hours
    const hoursAgo = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
    if (daysAgo > 0) {
      return daysAgo + " d";
    } else if (hoursAgo > 0) {
      return hoursAgo + " h";
    } else {
      return "1hr";
    }
  }