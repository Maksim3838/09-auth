"use client";
import { useAuth } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/api/clientApi";

import MobileMenu from "./MobileMenu";

const AuthNavigation = () => {
  const { user, isAuthenticated, clearAuth } = useAuth();
  const router = useRouter();

  const handleClick = async () => {
    await logOut();
    clearAuth();
    router.replace("/sign-in");
  };

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button onClick={handleClick} className={css.logoutButton}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>

      <MobileMenu
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogout={handleClick}
      />
    </>
  );
};

export default AuthNavigation;