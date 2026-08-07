import type { Metadata } from "next";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetails from "./NoteDetails.client";
import { fetchServerNoteById } from "@/lib/api/serverApi";

interface NotesDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NotesDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchServerNoteById(id);
  return {
    title: `${note.title}`,
    description: `${note.description}`,
    openGraph: {
      title: `${note.title}`,
      description: `${note.description}`,
      url: `https://08-zustand-two-pi.vercel.app/notes/${id}`,
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

const NotesDetails = async ({ params }: NotesDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchServerNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
};

export default NotesDetails;
