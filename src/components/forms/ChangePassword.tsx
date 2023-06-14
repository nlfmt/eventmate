import React, { useState } from "react";

import c from "./SignupForm.module.scss";
import common from "@/styles/common.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";
import { KeyRounded } from "@mui/icons-material";

type ChangeAccountInfoSchema = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const [passwordError, setPasswordError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ChangeAccountInfoSchema>();

  const { mutateAsync: changePassword } = api.user.changePassword.useMutation();

  const submitHandler: SubmitHandler<ChangeAccountInfoSchema> = async (
    data
  ) => {
    // await changePassword(data);
    setPasswordError("");

    if (data.newPassword !== data.confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return;
    }

    try {
      const isOldPasswordCorrect = await api.user.checkPassword(
        data.oldPassword
      );

      if (!isOldPasswordCorrect) {
        setPasswordError("Old password is incorrect");
        return;
      }

      await api.user.changePassword(data);
    } catch (err) {
      setPasswordError("An error occurred while changing your password");
    }
  };

  const validateOldPassword = async (oldPassword: string) => {
    // const isOldPasswordCorrect = await api.user.checkPassword(oldPassword);
    // if (isOldPasswordCorrect) {
    //   return true;
    // } else {
    //   return false;
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={c.form}>
      <div className={c.inputs}>
        <div className={c.txt_field}>
          <KeyRounded />
          <input
            type="password"
            {...register("oldPassword", { required: true })}
            data-error={!!errors.oldPassword}
          />
          <label className={c.label}>Old Password</label>
        </div>
        <div className={c.txt_field}>
          <KeyRounded />
          <input
            type="password"
            {...register("newPassword", { required: true })}
            data-error={!!errors.newPassword}
          />
          <label className={c.label}>New Password</label>
        </div>
        <div className={c.txt_field}>
          <KeyRounded />
          <input
            type="password"
            {...register("confirmPassword", { required: true })}
            data-error={!!errors.confirmPassword}
          />
          <label className={c.label}>Confirm Password</label>
        </div>
        {passwordError && <p className={c.error}>{passwordError}</p>}
        <button type="submit" className={common.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
