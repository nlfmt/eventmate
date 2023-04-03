import { LoginSchema } from "@/validation/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";

const LoginForm = () => {
  const router = useRouter();
  const errorMessage = router.query.error; // Get the NextAuth Error from the URL

  const {
    register, // function to register a form field
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>();


  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
      await signIn("credentials", {
        ...data,
        callbackUrl: "/",
      });
  };

  return <div>
    {errorMessage && <p>{errorMessage}</p>}
    <form onSubmit={handleSubmit(onSubmit)}>

      <label>Username</label>
      <input {...register("username", { required: true })} />
      {errors.username && <p>This field is required</p>}

      <label>Password</label>
      <input type="password" {...register("password", { required: true })} />
      {errors.password && <p>This field is required</p>}

      <button type="submit">Submit</button>
    </form>
  </div>;
};

export default LoginForm;
