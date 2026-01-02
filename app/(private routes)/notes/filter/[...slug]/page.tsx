import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Metadata } from 'next';
import { ALL_TAG, BASE_URL } from '@/lib/config/constants';
import { fetchNotesServer } from '@/lib/api/serverApi';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] || 'all';
  const title = `Notes: ${filter}`;
  const description = `Notes filtered by "${filter}"`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/notes/filter/${filter}`,
      images: [
        {
          url: '/notehub-og.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub',
        },
      ],
    },
  };
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === ALL_TAG ? undefined : slug[0];
  const page = 1;
  const query = '';

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', query, page, tag],
    queryFn: () => fetchNotesServer(query, page, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
