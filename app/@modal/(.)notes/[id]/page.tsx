import React from "react";
import NotePreview from "./NotePreview.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchServerNoteById } from "@/lib/api/serverApi";

interface NotesDetailsProps {
  params: Promise<{ id: string }>;
}

const Modal = async ({ params }: NotesDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchServerNoteById(id),
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreview />
      </HydrationBoundary>
    </div>
  );
};

export default Modal;
