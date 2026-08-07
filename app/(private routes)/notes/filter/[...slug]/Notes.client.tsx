"use client";
import css from "./page.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NoteList from "@/components/NoteList/NoteList";

import { Toaster } from "react-hot-toast";
import Pagination from "@/components/Pagination/Pagination";
import { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { fetchNotes } from "@/lib/api//clientApi";

interface NotesProps {
  tag?: string;
}

const Notes = ({ tag }: NotesProps) => {
  const [query, setQuery] = useState("");
  const [debounceTerm] = useDebounce(query, 500);
  const [currentPage, setCurrentPage] = useState(1);

  const { error, data, isLoading, isSuccess } = useQuery({
    queryKey: ["notes", debounceTerm, currentPage, tag],
    queryFn: () => fetchNotes(debounceTerm, currentPage, tag),
    placeholderData: keepPreviousData,
  });

  const onChange = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" />

      <header className={css.toolbar}>
        <SearchBox onChange={onChange} value={query} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total_pages={data.totalPages}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {data && data?.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
};

export default Notes;
