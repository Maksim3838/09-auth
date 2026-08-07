import React from "react";
import Notes from "./Notes.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { fetchServerNotes } from "@/lib/api/serverApi";
interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] == "All" ? "All" : slug[0];
  return {
    title: `${tag} Notes`,
    description: `Перегляньте нотатки, відфільтровані за ${tag}`,
    openGraph: {
      title: `${tag} Notes`,
      description: `Перегляньте нотатки, відфільтровані за ${tag}`,
      url: `https://08-zustand-two-pi.vercel.app/notes/filter/${slug}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const NotesPage = async ({ params }: NotesPageProps) => {
  const { slug } = await params;
  const tag = slug[0] == "All" ? undefined : slug[0];
  const queryClient = new QueryClient();
  const query = "";
  const currentPage = 1;

  await queryClient.prefetchQuery({
    queryKey: ["notes", query, currentPage, tag],
    queryFn: () => fetchServerNotes(query, currentPage, tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
