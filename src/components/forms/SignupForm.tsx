import { SignupSchema } from "@/validation/auth";
import { api } from "@/utils/api";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

const SignupForm = () => {
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
      await signIn("credentials", {
        username: user.username,
        password: getValues("password"),
        callbackUrl: "/",
      });
    }
  });

  const onSubmit: SubmitHandler<SignupSchema> = async (data) => {
    setErrorMessage(undefined);
    signup(data).catch(e => {});
  };

  return <div>
    {errorMessage && <p>{errorMessage}</p>}
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Username</label>
      <input {...register("username", { required: true })} />
      {errors.username && <p>This field is required</p>}
      <label>Email</label>
      <input {...register("email", { required: true })} />
      {errors.email && <p>This field is required</p>}
      <label>Password</label>
      <input type="password" {...register("password", { required: true })} />
      {errors.password && <p>This field is required</p>}

      <button type="submit">Submit</button>
    </form>
  </div>;
};

export default SignupForm;
