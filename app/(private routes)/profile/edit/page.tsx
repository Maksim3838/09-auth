'use client';
import { updateMe } from '@/lib/api/clientApi';
import css from './EditProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const username = formData.get('username') as string;
      if (username.trim()) {
        const newData = await updateMe({ username });
        setUser(newData);
        router.push('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user && (
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

            <form action={handleSubmit} className={css.profileInfo}>
              <div className={css.usernameWrapper}>
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  className={css.input}
                  defaultValue={user.username}
                />
              </div>

              <p>Email: {user.email}</p>

              <div className={css.actions}>
                <button type="submit" className={css.saveButton}>
                  Save
                </button>
                <button
                  onClick={() => router.push('/profile')}
                  type="button"
                  className={css.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      )}
    </>
  );
}

export default EditProfilePage;
