import { cookies } from 'next/headers'

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import PasswordPromptDialog from "@/components/shared/PasswordDialog";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loginCookies = cookies().get(process.env.PASSWORD_COOKIE_NAME!);
  const hasPwAccess = !!loginCookies?.value;

  return (
    <div className="flex h-screen flex-col">
      <Header />
      {!hasPwAccess ?
      <PasswordPromptDialog /> :
      <main className="flex-1">{children}</main>
      }
      <Footer />
    </div>
  );
}