import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';


export const client = createClient({
    projectId: "61g49341",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: true, // if you're using ISR 
  });


const builder = imageUrlBuilder(client)

export function urlFor(source:SanityImageSource) {
    return builder.image(source)
}

