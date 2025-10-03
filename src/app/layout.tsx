import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClientInterceptor } from "@/components/interceptorRequest/interceptor";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Store Feltec – Loja de Exemplo",
  description: "Explore a Store Feltec, um projeto de loja de exemplo da Feltec Solutions. Encontre produtos com design moderno, qualidade garantida e gestão eficiente para seu negócio ou residência.",
  keywords: [
    "Store Feltec",
    "loja de exemplo",
    "Feltec Solutions",
    "produtos de qualidade",
    "e-commerce",
    "gestão de produtos"
  ],
  authors: [
    { name: "Felipe Camargo", url: "https://www.linkedin.com/in/felipecamargo/" },
    { name: "Gabriel Oliveira" }
  ],
  creator: "Felipe Camargo, Gabriel Oliveira",
  publisher: "Feltec Solutions",
  themeColor: "#1F2937",
  colorScheme: "light dark",
  icons: {
    icon: "/icons/slack.svg",
    shortcut: "/icons/slack.svg",
    apple: "/icons/slack.svg"
  },
  openGraph: {
    title: "Store Feltec – Loja de Exemplo",
    description: "Descubra produtos de exemplo na Store Feltec, projeto da Feltec Solutions. Qualidade e design em um só lugar!",
    url: "https://store.feltec.com.br",
    siteName: "Store Feltec",
    images: [
      {
        url: "/icons/slack.svg",
        width: 1200,
        height: 630,
        alt: "Store Feltec – Slack Icon"
      }
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Store Feltec – Loja de Exemplo",
    description: "Explore a Store Feltec, projeto de exemplo da Feltec Solutions. Produtos de qualidade e design moderno.",
    site: "@FeltecSolutions",
    creator: "@FelipeCamargo, @GabrielOliveira",
    images: ["/icons/slack.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  lang: "pt-BR",
};

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <main>{children}</main>
          <ClientInterceptor /> 
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                padding: "18px 16px 18px 16px",
              },
            }}
            containerStyle={{
              top: 76,
              left: 20,
              bottom: 20,
              right: 20,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
