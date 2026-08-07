"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/app/api/api";
import css from "./SignUp.module.css";
import { useAuth } from "@/lib/store/authStore";
import { register, RegisterRequest } from "@/lib/api/clientApi";
const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(
        formData
      ) as unknown as RegisterRequest;
      const response = await register(formValues);

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
    <>
      <main className={css.mainContent}>
        <form className={css.form} action={handleSubmit}>
          <h1 className={css.formTitle}>Sign up</h1>
          <p>Sign up now and start exploring our app!</p>
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
              Register
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}

          <p className={css.signInText}>
            Do you already have an account?
          </p>
          <p>
            <Link href="/sign-in">Sign In</Link>
          </p>
        </form>
      </main>
    </>
  );
};

export default SignUp;
