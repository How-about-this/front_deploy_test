import type { Metadata } from "next";
// import { FontClassNames } from "./Styles/Font";
// import "./Styles/GlobalStyles.css";
import React from "react";
import Script from "next/script";
import './globals.css'
import ReduxProvider from "@/state/provider";


export const metadata: Metadata = {
  title: "honjaya",
  description: "honjaya project",
  icons: {
    icon: "../../public/sleeping.png", // 혼자야 icon으로 나중에 대체하기
  },
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="afterInteractive"
      />
    </html>
  );
}