import { type SignupSchema } from "@/validation/auth";
import { api } from "@/utils/api";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

import c from "./SignupForm.module.scss"


const SignupForm = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<SignupSchema>();

  const { mutateAsync: signup } = api.auth.signup.useMutation({
    onError: e => {
      setErrorMessage(e.message);
      const usernameErr = e.data?.zodError?.fieldErrors.username;
      const emailErr = e.data?.zodError?.fieldErrors.email;
      const passwordErr = e.data?.zodError?.fieldErrors.password;
      if (passwordErr && passwordErr[0]) setErrorMessage(passwordErr[0]);
      if (emailErr && emailErr[0]) setErrorMessage(emailErr[0]);
      if (usernameErr && usernameErr[0]) setErrorMessage(usernameErr[0]);
    },
    onSuccess: async (user) => {
      setErrorMessage(undefined);
      
      const res = await signIn("credentials", {
        username: user.username,
        password: getValues().password,
        redirect: false,
      });

      if (res && res.error) {
        setErrorMessage(res.error);
      } else if (res && res.ok) {
        router.push("/");
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  });

  const onSubmit: SubmitHandler<SignupSchema> = async (data) => {
    setErrorMessage(undefined);
    try {
      await signup(data);
    } catch (_e) {
    }
  };

  return <div>
    {errorMessage && <p>{errorMessage}</p>}
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className={c.description}>Username*</label>
      <input className={c.insertField} placeholder="Insert Username" {...register("username", { required: true })} />
      {errors.username && <p className={c.text}>This field is required</p>}
      <label className={c.description}>Email*</label>
      <input className={c.insertField} placeholder="Insert E-Mail" {...register("email", { required: true })} />
      {errors.email && <p className={c.text}>This field is required</p>}
      <label className={c.description}>Password*</label>
      <input className={c.insertField} placeholder="Create Password" type="password" {...register("password", { required: true })} />
      {errors.password && <p className={c.text}>This field is required</p>}
      <label className={c.description}>Confirm Password*</label>
      <input className={c.insertField} placeholder="Confirm Password" type="password" {...register("password", { required: true })} />
      {errors.password && <p className={c.text}>This field is required</p>}

      <button type="submit" className={c.SignUpButton}>Submit</button>
    </form>
  </div>;
};

export default SignupForm;
