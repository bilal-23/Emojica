import "@/styles/globals.css";
import NProgress from "nprogress";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/UI/toaster";
import Head from "next/head";
import { ToastContainer, Slide } from "react-toastify";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: true,
            retry: 3,
            refetchInterval: 5 * 60 * 1000, //5 minutes
          },
        },
      })
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Toaster />
          <ReactToaster />
        </QueryClientProvider>
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
