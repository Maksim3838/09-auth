"use client";
import React, { useState } from "react";
import css from "./MobileMenu.module.css";
import { Ultra } from "next/font/google";
import Link from "next/link";
import User from "@/types/user";

interface MobileProps {
  isAuthenticated: boolean;
  user: User | null;
  handleLogout: () => void;
}

const MobileMenu = ({ isAuthenticated, user, handleLogout }: MobileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className={css.mobileMenu}>
      <button className={css.btn} onClick={toggle}></button>

      {isOpen && (
        <ul className={css.menuList}>
          {isAuthenticated ? (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>{user?.email}</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/sign-in">Login</Link>
              </li>
              <li>
                <Link href="/sign-up">Sign up</Link>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default MobileMenu;