import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./layout/footer";
import "./styles/globals.css";
import "./styles/quiz.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Test DnD - Supabase(BaaS) & React",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className + " min-h-screen"}>
                {children}
                <Footer />
            </body>
        </html>
    );
}
