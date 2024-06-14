// components/Layout.tsx

import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, description, children }) => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
