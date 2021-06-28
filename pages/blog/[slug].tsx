// Dependencies
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";

import ViewsCounter from "../../components/ViewsCounter";
import MDXComponents from "../../components/MDXComponents";

import { getFiles, getFileBySlug } from "../../lib/mdx";

type Props = {
  frontMatter: {
    title: string;
    slug: string;
    image: string;
    wordCount: number;
    readingTime: {
      minutes: number;
      text: string;
      time: number;
      words: number;
    };
  };
  mdxSource: {
    compiledSource: string;
  };
};

const DynamicPost: NextPage<Props> = ({ frontMatter, mdxSource }) => {
  return (
    <div className="container mx-auto px-5">
      <h1 className="mb-8 text-4xl text-center font-bold">
        {frontMatter.title} - <ViewsCounter slug={frontMatter.slug} />
      </h1>

      <article className="prose max-w-full">
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </article>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles("posts");
  const paths = posts.map((post) => ({
    params: {
      slug: post.replace(/\.mdx/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getFileBySlug("posts", String(params?.slug));

  return {
    props: {
      ...post,
    },
  };
};

export default DynamicPost;
