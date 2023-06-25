import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Head from "next/head";
import { useGetAllUserQuery } from "@/queries/userQueries";
import Feed from "@/components/Homepage/feed";
import CreatePost from "@/components/Post/create-post";
import Aside from "@/components/Layout/Aside";
import UserSuggestions from "@/components/Homepage/user-suggestions";

export default function Home() {
  const { isLoading, isError, data } = useGetAllUserQuery();
  console.log(data);

  return (
    <>
      <Head>
        <title>Emojica | Home</title>
      </Head>
      <main>
        <div className="py-10 pt-6  px-2">
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
