import { LoginSchema } from "@/validation/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import c from "./LoginForm.module.scss"

const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register, // function to register a form field
    handleSubmit,
    formState: { errors },
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
    {errorMessage && <p className={c.error}>{errorMessage}</p>}  
    <form onSubmit={handleSubmit(onSubmit)}>

      <label>Username</label>
      <input {...register("username", { required: true })} />
      {errors.username && <p className={c.error}>This field is required</p>}

      <label>Password</label>
      <input type="password" {...register("password", { required: true })} />
      {errors.password && <p className={c.error}>This field is required</p>}

      <button type="submit">Submit</button>
    </form>
  </div>;
};

export default LoginForm;
