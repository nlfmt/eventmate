import React from "react";

import c from "./ChangePassword.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";
import { KeyRounded } from "@mui/icons-material";

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
      <div className={c.txt_field}>
      <KeyRounded />
      <input type="text" {...register("oldPassword", { required: true })} data-error={!!errors.oldPassword} />
      <label className={c.label}>Old Password</label>
      </div>
      <div className={c.txt_field}>
      <KeyRounded />
      <input type="text" {...register("newPassword", { required: true })} data-error={!!errors.newPassword} />
      <label className={c.label}>New Password</label>
      </div>
      <div className={c.txt_field} >
        <KeyRounded />
      <input type="text" {...register("confirmPassword", { required: true })} data-error={!!errors.confirmPassword} />
      <label className={c.label}>Confirm Password</label>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
};

export default ChangePassword;
