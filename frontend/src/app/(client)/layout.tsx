import { Footer } from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Toaster richColors position="top-center" theme="dark" />
      {children}
      <Footer />
    </div>
  );
}
