import { NoteTag } from '@/types/note';
import css from './SidebarNotes.module.css';
import Link from 'next/link';
import { ALL_TAG } from '@/lib/config/constants';

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/${ALL_TAG}`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {TAGS.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
