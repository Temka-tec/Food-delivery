import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <Toaster richColors position="top-center" theme="dark" />
      {children}
      <Footer />
    </div>
  );
}
