import "@/styles/globals.css";

import { Poppins } from "next/font/google";
import { Header } from "./components/Header";

const inter = Poppins({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }) {
  return (
    <>
      <main
        className={`${inter.className} min-h-screen px-4 bg-background text-black`}
      >
        <Header />
        <Component {...pageProps} />
      </main>
    </>
  );
}
