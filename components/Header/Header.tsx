import Link from "next/link";
import React from "react";
import { FiHome } from "react-icons/fi";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.logo}>
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/" className={css.navLink}>
              <FiHome className={css.icon} /> Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/notes/filter/All" className={css.navigationLink}>
              Notes
            </Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
