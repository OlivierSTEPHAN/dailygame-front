import { StrictMode } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <ToastContainer />
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </StrictMode>
  );
}

export default MyApp;
