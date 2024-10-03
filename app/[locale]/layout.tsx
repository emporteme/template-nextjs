import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { I18nProviderClient } from "@/app/locales/client";  // Я не запутался куда поставить в app/ или shared/ и так как я буду вызывать локализацию везде решил его все же вызывать в app/ так как я бы вызывал его даже внутри shared/ и решил сделать первое исключение по FSD.
import '@/app/styles/globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daryn",
  description: "Daryn | Developed by Crocos",
};

export default function RootLayout({
  params: { locale },
  children,
}: {
  params: { locale: string },
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <I18nProviderClient locale={locale}>
          {children}
        </I18nProviderClient>
      </body>
    </html>
  );
}
