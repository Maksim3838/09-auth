import { FetchNotesResponse, Note } from '@/types/note';
import { nextServer } from './api';
import { cookies } from 'next/headers';
import { CheckSessionRequest } from '@/types/requests';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';

export async function fetchNotesServer(
  searchValue: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: {
      ...(searchValue !== '' && { search: searchValue }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
  });
  return data;
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function checkSessionServer(): Promise<
  AxiosResponse<CheckSessionRequest>
> {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionRequest>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function getMeServer(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function checkSession(refreshToken: string) {
  const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refreshToken=${refreshToken}`,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Session expired');
  }

  return res.json(); 
}
