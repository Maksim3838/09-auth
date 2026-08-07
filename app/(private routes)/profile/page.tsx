import Image from "next/image";

import css from "./Profile.module.css";
import { getServerMe } from "@/lib/api//serverApi";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit your Profile",
  description: "Here you can edit your profile.",
  openGraph: {
    title: "Edit your Profile",
    description: "Here you can edit your profile.",
    url: "https://08-zustand-two-pi.vercel.app/profile/edit",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub",
      },
    ],
  },
};

const Profile = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link className={css.editProfileButton} href="/profile/edit">
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
