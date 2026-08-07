import type { Note, Tag } from "@/types/note";
import type User from "@/types/user";
import { nextServer } from "./api";

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

interface PatchMeResponse {
  username: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};

interface CreateNoteResponse {
  note: Note;
}

interface CreateNote {
  title: string;
  content: string;
  tag: Tag;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface DeleteNoteResponse {
  note: Note;
}

export interface SessionResponse {
  success: boolean;
}

export const fetchNotes = async (
  query: string,
  currentPage: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      search: query,
      page: currentPage,
      perPage: 12,
      tag: tag,
    },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const response = await nextServer.get(`/notes/${noteId}`);
  return response.data;
};

export const createNote = async (
  note: CreateNote
): Promise<CreateNoteResponse> => {
  const response = await nextServer.post<CreateNoteResponse>("/notes", note);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await nextServer.delete<DeleteNoteResponse>(
    `/notes/${noteId}`
  );
  return response.data;
};

export const register = async (body: RegisterRequest) => {
  const response = await nextServer.post<User>("/auth/register", body);
  return response.data;
};

export const login = async (body: LoginRequest) => {
  const response = await nextServer.post<User>("/auth/login", body);
  return response.data;
};

export const checkSession = async () => {
  const { data } = await nextServer.get<SessionResponse>("/auth/session");
  return data.success;
};
export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logOut = async () => {
  await nextServer.post("/auth/logout");
};

export const patchMe = async ({ username }: PatchMeResponse) => {
  const { data } = await nextServer.patch<User>("/users/me", {
    username,
  });
  return data;
};
