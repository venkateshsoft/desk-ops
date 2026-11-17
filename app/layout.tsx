import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "DeskOps | Service Desk Operations", description: "Enterprise service desk operations management" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
