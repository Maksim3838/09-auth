import { Metadata } from 'next';
import css from './Home.module.css';
import { BASE_URL } from '@/lib/config/constants';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'This page does not exist.',
  openGraph: {
    title: 'Page Not Found',
    description: 'This page does not exist.',
    url: BASE_URL,
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

const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFound;
