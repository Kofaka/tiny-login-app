import { ReactNode } from 'react';
import Head from 'next/head';

type PageWrapperProps = {
  title?: string;
  children: ReactNode;
};

const PageWrapper = ({ title, children }: PageWrapperProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Example of the login form" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </>
  );
};

export default PageWrapper;
