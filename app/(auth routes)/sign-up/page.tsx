'use client';
import css from './SignUpPage.module.css';
import { useMutation } from '@tanstack/react-query';
import { getMe, register } from '@/lib/api/clientApi';
import { useState } from 'react';
import { RegisterRequest } from '@/types/requests';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
//StrongPass123

function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: async () => {
      const user = await getMe();
      setUser(user);
      router.push('/profile');
    },
    onError: () => {
      setError('User already exists or invalid data'
      );
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
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
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
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

export default SignUp;
