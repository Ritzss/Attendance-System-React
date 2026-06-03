import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Attendance Admin",
  description: "Admin-only attendance management panel",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body cz-shortcut-listen="true">
=======
      <body>
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
