import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Linkify - A Modern Way To Shorten Your URL",
  description: "name is self explainatory",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Provider>
          {children}
        </Provider>

        <div className="bg-[#281b41] w-80 rotate-180 h-96 fixed top-0 left-14 -z-10 rounded-4xl blur-[100px]"></div>
        <div className="bg-[#281b41] w-96 rotate-180 h-96 fixed top-0 right-14 -z-10 blur-[180px]"></div>
      </body>
    </html>
  );
}
