import React from "react";

import c from "./ChangePassword.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";

type ChangeAccountInfoSchema = {
  username: string;
  email: string;
  bio: string;
}

const ChangeAccountInfo = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangeAccountInfoSchema>();

  const { mutateAsync: ChangeAccountInfo } = api.user.changeAccountInfo.useMutation();

  const submitHandler: SubmitHandler<ChangeAccountInfoSchema> = async (data) => {
    await ChangeAccountInfo(data);
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={c.form}>
      <input type="text" {...register("username", { required: true })} data-error={!!errors.username} />
      <input type="text" {...register("email", { required: true })} data-error={!!errors.email} />
      <input type="text" {...register("bio", { required: true })} data-error={!!errors.bio} />
      <button type="submit">Submit</button>
    </form>
  )
};

export default ChangeAccountInfo;
