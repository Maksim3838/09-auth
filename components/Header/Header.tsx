import Link from 'next/link';
import css from './Header.module.css';
import { ALL_TAG } from '@/lib/config/constants';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import NavLink from '../NavLink/NavLink';

function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <NavLink
              href="/"
              exact
              className={css.navLink}
              activeClassName={css.active}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/notes/filter/${ALL_TAG}`}
              className={css.navLink}
              activeClassName={css.active}
            >
              Notes
            </NavLink>
          </li>

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}

export default Header;
