'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import NoteList from '@/components/NoteList/NoteList';
import css from './NotesPage.module.css';
import { fetchNotes } from '@/lib/api/clientApi';
import { useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Link from 'next/link';

interface Props {
  tag?: string;
}

function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);

  const { data } = useQuery({
    queryKey: ['notes', debouncedQuery, page, tag],
    queryFn: () => fetchNotes(debouncedQuery, page, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearch = (newValue: string) => {
    setPage(1);
    setQuery(newValue);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} value={query} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        data && <p>Nothing found</p>
      )}
    </div>
  );
}

export default NotesClient;
