import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import Link from "next/link";
import { YouTubePreview } from "./YoutubeComp";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextComponent } from '@sanity/block-content-to-react';
import PhotoViewer from '@/components/PhotoViewer'

const imageBuilder = urlBuilder({
  projectId: "61g49341", // Replace with your Sanity project ID
  dataset: "production", // Replace with your Sanity dataset
});

export const RichTextComponents:PortableTextComponent = {
  types: {
    // image: ({ value }:any) => {
    //   const { width, height } = getImageDimensions(value);
    //   console.log(value)
    //   return (
    //     <div  >
    //     <img
    //       src={imageBuilder.image(value).url()}
    //       alt={value.alt || " "}
    //       loading="lazy"
    //       className="md:px-0 h-full w-full"
    //       style={{ aspectRatio: width / height,marginTop:"40px",marginBottom:"40px"}}
    //     />
    //     </div>

    //   );
      // {
      //   _type: 'image',
      //   _key: '0cf4a9dfd501',
      //   asset: {
      //     _ref: 'image-cc79888a85949db43ffc81df8c3f34960f518f4e-2048x1365-jpg',
      //     _type: 'reference'
      //   }
      // }
    // },
    slideimages: ({ value }:any) => {
     
      return <div className="w-3/4 h-80 ml-auto mr-auto mt-8 mb-4">
        <PhotoViewer images={value.images}></PhotoViewer>
      </div> 
    },
    youtube:({value}:any) => {
      return <div style={{marginTop:'40px',marginBottom:"40px"}} className="flex flex-row justify-center items-center" >
        <YouTubePreview url={value.url} class={undefined}></YouTubePreview>
      </div>
    }
  },
  block: {
      normal: ({ children }:any) => (
      <p className="px-2 text-base my-5  leading-7 md:text-lg md:my-4">{children}</p>
    ),
    h1: ({ children }:any) => (
      <h1 className="px-2 text-2xl md:text-4xl md:text-left font-bold my-4">{children}</h1>
    ),
    h2: ({ children }:any) => (
      <h2 className="px-2 text-2xl md:text-3xl md:text-left font-bold my-4">{children}</h2>
    ),
    h3: ({ children }:any) => (
      <h3 className="px-2 text-xl md:text-2xl md:text-left font-bold my-4">{children}</h3>
    ),
    h4:({ children }:any) => (
      <h3 className="px-2 text-xl md:text-xl md:text-left font-bold my-4">{children}</h3>
    ),
    blockquote: ({ children }:any) => (
      <blockquote className="border-l-4 pl-4 my-4 italic text-gray-700 border-gray-300">
        {children}
      </blockquote>
    ),
    ul: ({ children }:any) => <ul className="px-2 text-base list-disc ml-8 my-4 md:text-xl md:text-left">{children}</ul>,
    ol: ({ children }:any) => (
      <ol className="list-decimal ml-8 my-4">{children}</ol>
    ),
    em:({ children }:any) => <em className="px-2 text-base md:text-xl  my-4 md:text-left">{children}</em>,
    li: ({ children }:any) => <li className="px-2 text-base md:text-xl my-4 md:text-left">{children}</li>,
    //p: ({ children }:any) => <p className="px-2 leading-6  md:text-xl my-4 md:text-left" style={{lineHeight:"20px",letterSpacing:"10px"}}>{children}</p>,
  },
  marks: {
    link: ({ children, value }:{children:any,value:any}) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          className="text-blue-500 hover:text-blue-700"
        >
          {children}
        </Link>
      );
    },
  },
};