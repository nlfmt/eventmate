import { LoginSchema } from "@/validation/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import c from "./SignupForm.module.scss"
import common from "@/styles/common.module.scss"
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register, // function to register a form field
    handleSubmit,
    formState: { errors },
    getValues
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

  return <div>
    {errorMessage && <p>{errorMessage}</p>}

    <form onSubmit={handleSubmit(onSubmit)}>

      <div className={c.txt_field} data-error={!!errors.username} data-has-text={!!getValues().username}>
        <input {...register("username", { required: true })} />
        <span className={c.span}></span>
        <label>Username</label>
      </div>
      
      <div className={c.txt_field} data-error={!!errors.password} data-has-text={!!getValues().password}>
        <input type="password" {...register("password", { required: true })} />
        <span className={c.span}></span>
        <label>Password</label>
      </div>

      <div className={c.pass}>Forgot Password?</div>
      <button type="submit" className={common.submitButton}>Submit</button>
      <div className={c.signin_link}>Don&apos;t have an account? <Link href="/signup" className={c.link}> Signup</Link></div>
      
    </form>
  </div>;
};

export default LoginForm;
