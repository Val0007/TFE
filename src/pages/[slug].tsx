import { createClient } from "next-sanity";
import {PortableText} from '@portabletext/react'
import { RichTextComponents } from "@/components/RichComponents";
import NavBar from '../components/NavBar'
import { useRouter } from "next/router";

// ...

const client = createClient({
  projectId: "61g49341",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: true, // if you're using ISR 
});

interface SlugType{
    title: string
}
interface SlugType2{
    params:{
      slug: string;
    }
}

export async function getStaticPaths() {
  // Fetch all blog post slugs from Sanity CMS
  const slugs:SlugType[] = await client.fetch(`*[_type == "article"]{title}`);

  // Map slugs to paths
  console.log(slugs);
  const paths = slugs.map((slug) => ({
    params: { slug:slug.title },
  }));

  return {
    paths,
    fallback: true, // Set to true to enable ISR //in dev env it renders all the time
  };
}

export async function getStaticProps(params:SlugType2) {
  // Fetch blog post data based on the slug
  const post = await client.fetch(`*[_type == "article" && title == "${params.params.slug}"]`);

  return {
    props: {
      post,
    },
    revalidate: 24*60*60, // Revalidate every 24 hours
  };
}

// Your component code here to render the blog post
export default function BlogPost({ post}:any) {
    // Render the blog post content here using the "post" data

    const router = useRouter();

    if (router.isFallback) {
      return <h1>Data is loading</h1>;
    }

    if(post[0].blocks == undefined){
      post[0].blocks = [];
    }

    console.log(post[0].blocks)


    return (
      <div>
        <NavBar page="slug"></NavBar>
      <div className="md:flex md:flex-col md:justify-center md:items-center">
      <div className="w-screen px-4 text-base md:text-lg lg:text-xl md:px-0 md:w-1/2 text-left ">

        <PortableText
        value={post[0].blocks || []}
        components={RichTextComponents}
        ></PortableText>
      </div>
      </div>
      </div>


    );
  }