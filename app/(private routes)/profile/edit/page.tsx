"use client";
import Image from "next/image";
import css from "./EditProfile.module.css";
import { useEffect, useState } from "react";
import { getMe, patchMe } from "@/lib/api//clientApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";

const EditPage = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { setUser, user } = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getMe();
      setUser(data);
      setUsername(data.username);
    };
    fetchUser();
  }, [setUser]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    try {
      await patchMe({ username });
      const updatedUser = await getMe();
      setUser(updatedUser);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    router.push("/profile");
  };

  if (!user) return <p>Loading...</p>;
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              value={username}
              className={css.input}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleClick}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditPage;
