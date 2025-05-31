import type { Metadata } from "next";

import "./globals.css";
import { SideBar } from "./components/SideBar";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";



export const metadata: Metadata = {
  title: "GlammGiannt",
  description: "Qué sueño",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className="min-h-screen flex flex-col md:flex-row"
      >
        <div className="hidden md:block w-64 bg-amber-700 text-white">
          {/* Página grande el menú*/}
          <SideBar/>
        </div>
        <div className="flex-1 flex flex-col">

          <div className="md:hidden p-2">
            {/* Página móvil el menú*/}
            <SideBar/>
          </div>
          <Header/>
          <main className="flex-1 p-6 bg-gray-100">{children}</main>
          <Footer/>
        </div>
        
      </body>
    </html>
  );
}
