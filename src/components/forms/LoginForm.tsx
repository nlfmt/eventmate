import { LoginSchema } from "@/validation/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import c from "./SignupForm.module.scss"

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
    {errorMessage && <p>{errorMessage}</p>}
    <form onSubmit={handleSubmit(onSubmit)}>

      <label className={c.description}>Username</label>
      <input className={c.insertField} placeholder="Insert Username" {...register("username", { required: true })} />
      {errors.username && <p>This field is required</p>}

      <label className={c.description}>Password</label>
      <input className={c.insertField} placeholder="Create Password" type="password" {...register("password", { required: true })} />
      {errors.password && <p>This field is required</p>}

      <button type="submit" className={c.SignUpButton}>Submit</button>
    </form>
  </div>;
};

export default LoginForm;
