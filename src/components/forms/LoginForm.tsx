import type { LoginSchema } from "@/validation/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import c from "./SignupForm.module.scss"
import common from "@/styles/common.module.scss"
import Link from "next/link";
import { KeyRounded, PersonRounded } from "@mui/icons-material";
import useMediaQuery from "@/hooks/useMediaQuery";

const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const isMobile = useMediaQuery('(max-width: 499px)');

  const {
    register, // function to register a form field
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<LoginSchema>();


  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res && res.ok) {
      router.push("/"); // Redirect to the homepage
    } else if (res && res.error) {
      setErrorMessage(res.error); // Set the error message
    } else {
      setErrorMessage("Something went wrong"); // Set the error message
    }
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={c.inputs}>
          <div
            className={c.txt_field}
            data-error={!!errors.username}
            data-has-text={!!watch("username")}
          >
            <PersonRounded />
            <input
              {...register("username", { required: true })}
              autoComplete="off"
            />
            <label>Username</label>
          </div>

          <div
            className={c.txt_field}
            data-error={!!errors.password}
            data-has-text={!!watch("password")}
          >
            <KeyRounded />
            <input
              type="password"
              {...register("password", { required: true })}
            />
            <label>Password</label>
          </div>
        </div>

        <div className={c.pass}>Forgot Password?</div>

        {isMobile ? (
          <div style={{ flexGrow: "1" }}></div>
        ) : (
          <div style={{ height: "8rem" }}></div>
        )}

        <button type="submit" className={common.submitButton}>
          Submit
        </button>
        <div className={c.signin_link}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className={c.link}>
            {" "}
            Signup
          </Link>
        </div>

        <div style={{ height: "2rem" }}></div>
      </form>
    </div>
  );
};

export default LoginForm;
