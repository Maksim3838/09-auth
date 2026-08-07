"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError } from "@/app/api/api";
import css from "./SignIn.module.css";
import { useAuth } from "@/lib/store/authStore";
import { login, LoginRequest } from "@/lib/api//clientApi";

const SignIn = () => {
  const { setUser } = useAuth();
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(
        formData
      ) as unknown as LoginRequest;
      const response = await login(formValues);

      if (response) {
        setUser(response);
        router.replace("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Whoops...some error"
      );
    }
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>
        <p>You’re one step closer to your goals. Let’s get started!</p>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="yourmail@gmail.com"
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
            placeholder="********"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}

        <p className={css.signUpText}>
          You don`t have any account?
        </p>
        <p>
          <Link href="/sign-up">Sign Up</Link>
        </p>
      </form>
    </main>
  );
};

export default SignIn;
