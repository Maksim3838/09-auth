import React from "react";
import { Metadata } from "next";
interface LayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Create your own notes and you will never forget anything.",
  openGraph: {
    title: "Notehub",
    description: "Create your own notes and you will never forget anything.",
    url: "https://08-zustand-two-pi.vercel.app/notes/filter/All",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub",
      },
    ],
  },
};

const Layout = ({ children, sidebar }: LayoutProps) => {
  return (
    <div>
      {sidebar}
      {children}
    </div>
  );
};

export default Layout;
