// updateMe;
import { User } from '@/types/user';
import type { FetchNotesResponse, NewNote, Note } from '../../types/note';
import { nextServer } from './api';
import { CheckSessionRequest, RegisterRequest, UpdateMeRequest } from '@/types/requests';

export async function fetchNotes(
  searchValue: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> {
  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      ...(searchValue !== '' && { search: searchValue }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
  });
  return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await nextServer.post<Note>('/notes', newNote);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await nextServer.delete(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

export async function register(userData: RegisterRequest): Promise<User> {
  const { data } = await nextServer.post<User>('/auth/register', userData);
  return data;
}

export async function login(userData: RegisterRequest): Promise<User> {
  const { data } = await nextServer.post<User>('/auth/login', userData);
  return data;
}

export async function checkSession(): Promise<boolean> {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
}

export async function getMe(): Promise<User> {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
}

export async function logout(): Promise<void> {
  await nextServer.post('/auth/logout');
}

export async function updateMe(newData: UpdateMeRequest): Promise<User> {
  const { data } = await nextServer.patch<User>('/users/me', newData);
  return data;
}
