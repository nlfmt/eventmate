import { type SignupSchema } from "@/validation/auth";
import { api } from "@/utils/api";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

import c from "./SignupForm.module.scss"
import common from "@/styles/common.module.scss"
import Link from "next/link";
import { EmailRounded, KeyRounded, PersonRounded } from "@mui/icons-material";


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

      <div className={c.inputs}>
        <div className={c.txt_field} data-error={!!errors.username} data-has-text={!!getValues().username}>
          <PersonRounded />
          <input {...register("username", { required: true })} />
          <label  className={c.label}>Username</label>
        </div>
        <div className={c.txt_field} data-error={!!errors.email} data-has-text={!!getValues().email}>
          <EmailRounded />
          <input {...register("email", { required: true })} />
          <label className={c.label}>Email</label>
        </div>
        <div className={c.txt_field} data-error={!!errors.password} data-has-text={!!getValues().password}>
          <KeyRounded />
          <input type="password" {...register("password", { required: true })} />
          <label  className={c.label}>Password</label>
        </div>
        <div className={c.txt_field} data-error={!!errors.password} data-has-text={!!getValues().password}>
          <KeyRounded />
          <input type="password" {...register("password", { required: true })} />
          <label  className={c.label}>Confirm Password</label>
        </div>
      </div>
      <div style={{ height: "4rem" }}></div>

      <button type="submit" className={common.submitButton}>Submit</button>
      <div className={c.signin_link}> Already have an account? <Link href="/login" className={c.link}> Log in</Link></div>
      
    </form>
  </div>;
};

export default SignupForm;
