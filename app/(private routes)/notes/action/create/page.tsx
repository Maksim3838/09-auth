import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Metadata } from 'next';
import { BASE_URL } from '@/lib/config/constants';

export const metadata: Metadata = {
  title: 'Create Note',
  description: 'Create Note',
  openGraph: {
    title: 'Create Note',
    description: 'Create Note',
    url: `${BASE_URL}notes/action/create`,
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

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
