
interface YoutubeProps{
    url:string;
    class:string | undefined;
}

export function YouTubePreview(props:YoutubeProps) {
    const url = props.url;
  
    // Function to extract the video ID from the YouTube URL
    const getVideoId = (url:string) => {
      const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))([^&\n?#]+)/);
      return (videoIdMatch && videoIdMatch[1]) || '';
    };
  
    // Construct the iframe URL
    const videoId = getVideoId(url);
    const iframeUrl = `https://www.youtube.com/embed/${videoId}`;
    const className = props.class ? props.class : 'w-3/4 md:w-full flex justify-center items-center';
    return (
      <div className={className}>
        {/* Render the YouTube iframe */}
        <iframe
          className="h-full w-full " //md:not working with sanity inside richtextcomponents
          src={iframeUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  