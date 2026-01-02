'use client';

import css from './NoteForm.module.css';
import type { NoteTag } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import * as Yup from 'yup';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { ALL_TAG } from '@/lib/config/constants';

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title is too long')
    .required(),
  content: Yup.string().max(500, 'Content is too long'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Select tag')
    .required(),
});

function NoteForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setDraft({
      ...draft,
      [name]: value,
    });
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
      router.push(`/notes/filter/${ALL_TAG}`);
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const values: NoteFormValues = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    };
    try {
      setErrors({});
      await NoteFormSchema.validate(values, { abortEarly: false });
      mutate(values);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const formErrors: Record<string, string> = {};
        err.inner.forEach((e: Yup.ValidationError) => {
          if (e.path) formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          value={draft.title}
          onChange={handleChange}
          id="title"
          type="text"
          name="title"
          className={css.input}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          value={draft.content}
          onChange={handleChange}
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          value={draft.tag}
          onChange={handleChange}
          id="tag"
          name="tag"
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button
          onClick={() => router.push(`/notes/filter/${ALL_TAG}`)}
          type="button"
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
