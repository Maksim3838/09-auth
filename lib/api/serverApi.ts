import User from "@/types/user";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { Note } from "@/types/note";

interface fetchServerNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return response;
};

export const fetchServerNotes = async (
  query: string,
  currentPage: number,
  tag?: string
): Promise<fetchServerNotesResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<fetchServerNotesResponse>("/notes", {
    params: {
      search: query,
      page: currentPage,
      perPage: 10,
      tag: tag,
    },
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
};

export const fetchServerNoteById = async (noteId: string) => {
  const cookieStore = await cookies();
  const response = await nextServer.get(`/notes/${noteId}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
};
