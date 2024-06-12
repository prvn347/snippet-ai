import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Appbar } from "@/components/AppBar";
import { cn } from "../lib/utils";
import { ThemeProvider } from "next-themes";
import { Providers } from "./provider";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SnippetAI",
  description:
    "It is an app that lets used create and share AI explained gists or snippets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen  bg-background  font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Appbar />
            {children}
            <Toaster />
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
