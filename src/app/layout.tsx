import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { CustomProviders } from "@/lib/custom-providers";
import { cn } from "@/lib/utils";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "MyNote",
  description: "본인의 일정 관리를 쉽게 만드는 웹 애플리케이션",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={cn(ubuntu.className, "w-screen h-screen text bg")}>
        <CustomProviders>{children}</CustomProviders>
      </body>
    </html>
  );
}
