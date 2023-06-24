import "@/styles/globals.css";
import NProgress from "nprogress";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/UI/toaster";
import Head from "next/head";
import { ToastContainer, Slide } from "react-toastify";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
          <ReactToaster />
        </Layout>
      </SessionProvider>
    </>
  );
}

function ReactToaster() {
  return (
    <ToastContainer
      transition={Slide}
      position="top-right"
      autoClose={1000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      className={"toast-container"}
      limit={3}
    />
  );
}
