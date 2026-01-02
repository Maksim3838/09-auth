'use client';
import { useState } from 'react';
import css from './SignInPage.module.css';
import { getMe, login } from '@/lib/api/clientApi';
import { useMutation } from '@tanstack/react-query';
import { RegisterRequest } from '@/types/requests';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

function SignIn() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      const user = await getMe();
      setUser(user);
      router.push('/profile');
    },
    onError: () => {
      setError('Invalid email or password');
    },
  });

  const handleSubmit = (formData: FormData) => {
    setError('');
    const formValues: RegisterRequest = {
      email: String(formData.get('email')),
      password: String(formData.get('password')),
    };
    console.log(formValues);
    mutate(formValues);
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Login</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

export default SignIn;
