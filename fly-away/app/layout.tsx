import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "FlyAway - Flight Booking",
  description: "Find the best deals on flight segments dynamically.",
  manifest: "/manifest.webmanifest", // <-- ADD THIS LINE
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
