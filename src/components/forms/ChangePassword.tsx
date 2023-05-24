import React from "react";

import c from "./ChangePassword.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";

type ChangeAccountInfoSchema = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangeAccountInfoSchema>();

  const { mutateAsync: changePassword } = api.user.changePassword.useMutation();

  const submitHandler: SubmitHandler<ChangeAccountInfoSchema> = async (data) => {
    await changePassword(data);
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={c.form}>
      <input type="text" {...register("oldPassword", { required: true })} data-error={!!errors.oldPassword} />
      <input type="text" {...register("newPassword", { required: true })} data-error={!!errors.newPassword} />
      <input type="text" {...register("confirmPassword", { required: true })} data-error={!!errors.confirmPassword} />
      <button type="submit">Submit</button>
    </form>
  )
};

export default ChangePassword;
