import React, { useState } from "react";

import c from "./ChangePassword.module.scss";
import common from "@/styles/common.module.scss";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";
import { ArrowBackRounded, KeyRounded } from "@mui/icons-material";
import { classes } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

type ChangeAccountInfoSchema = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChangeAccountInfoSchema>();

  const { mutateAsync: changePassword } = api.user.changePassword.useMutation();

  const submitHandler: SubmitHandler<ChangeAccountInfoSchema> = (
    data
  ) => {
    setPasswordError("");

    if (data.newPassword !== data.confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return;
    }

    changePassword(data, {
      onError: (err) => {
        setPasswordError(err.message);
      },
      onSuccess: (d) => {
        signIn("credentials", {
          callbackUrl: "/account",
          email: d.email,
          password: data.newPassword,
        });
      }
    });
  };

  return (
    <form className={c.form} onSubmit={handleSubmit(submitHandler)}>
      <Link href="/account" className={c.header}>
        <ArrowBackRounded />
        <span>Change Password</span>
      </Link>
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
          <p className={classes(c.error, c.errorMessage)}>{passwordError}</p>
        )}
        <button type="submit" className={common.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
