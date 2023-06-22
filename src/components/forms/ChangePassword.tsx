import React, { useState } from "react";

import c from "./ChangePassword.module.scss";
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
    watch,
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
    <form className={c.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={c.inputs}>
        <div
          className={c.txt_field}
          data-error={!!errors.oldPassword}
          data-has-text={!!watch("oldPassword")}
        >
          <KeyRounded />
          <input
            type="password"
            {...register("oldPassword", { required: true })}
          />
          <label className={c.label}>Old Password</label>
        </div>
        <div
          className={c.txt_field}
          data-error={!!errors.newPassword}
          data-has-text={!!watch("newPassword")}
        >
          <KeyRounded />
          <input
            type="password"
            {...register("newPassword", { required: true })}
          />
          <label className={c.label}>New Password</label>
        </div>
        <div
          className={c.txt_field}
          data-error={!!errors.confirmPassword}
          data-has-text={!!watch("confirmPassword")}
        >
          <KeyRounded />
          <input
            type="password"
            {...register("confirmPassword", { required: true })}
          />
          <label className={c.label}>Confirm Password</label>
        </div>
        {passwordError && (
          <p className={`${c.error} ${c.errorMessage}`}>{passwordError}</p>
        )}
        <button type="submit" className={common.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
