import localFont from "next/font/local";
import { Container } from "@mui/material";
import "./globals.css";
import NavBar from "./components/NavBar";
import UserContextProvider from "./providers/UserContextProvider";
import AlertContextProvider from "./providers/AlertContextProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Ravenclojure - Campaigns",
  description: "TP de TDL - Solidity",
};

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AlertContextProvider>
          <UserContextProvider>
            <NavBar />

            <div className='mx-auto max-w-4xl px-4 py-8'>
              <Container>{children}</Container>
            </div>
          </UserContextProvider>
        </AlertContextProvider>
      </body>
    </html>
  );
}
