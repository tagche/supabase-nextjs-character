'use client';

import { Noto_Sans_JP } from "next/font/google";
import Footer from "./layout/footer";
import "./styles/quiz.scss";
import { RecoilRoot } from "recoil";

const noto = Noto_Sans_JP ({
    weight: ["400", "700", "900"],
    style: "normal",
    subsets: ["latin"],
})

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ja">
            <body className={noto.className}>
                <RecoilRoot>
                    {children}
                </RecoilRoot>
                <Footer />
            </body>
        </html>
    );
}
