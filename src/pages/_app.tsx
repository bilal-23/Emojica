import "@/styles/globals.css";
import NProgress from "nprogress";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/UI/toaster";
import Head from "next/head";
import Router from "next/router";

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
        </Layout>
      </SessionProvider>
    </>
  );
}
