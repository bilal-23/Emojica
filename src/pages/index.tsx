import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Head from "next/head";
import { useGetAllUserQuery } from "@/queries/userQueries";
import Feed from "@/components/Homepage/feed";
import CreatePost from "@/components/Post/create-post";

export default function Home() {
  const { isLoading, isError, data } = useGetAllUserQuery();
  console.log(data);

  return (
    <>
      <Head>
        <title>Emojica | Home</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between 
        lg:yp-24 py-0`}
      >
        <CreatePost />
        <Feed />
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
