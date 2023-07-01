import Head from "next/head";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useGetAllUserQuery } from "@/queries/userQueries";
import Feed from "@/components/Homepage/feed";
import CreatePost from "@/components/Post/create-post";

export default function Home() {
  return (
    <>
      <Head>
        <title>Emojica | Home</title>
      </Head>
      <main className="w-full">
        <div className="w-full py-10 pt-6  px-2">
          <CreatePost />
          <Feed />
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
