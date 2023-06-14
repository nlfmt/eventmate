import React, { useEffect } from "react";

import c from "./ChangeAccountInfo.module.scss";
import common from "@/styles/common.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { CheckRounded, EditRounded } from "@mui/icons-material";
import Link from "next/link";

type ChangeAccountInfoSchema = {
  username: string;
  email: string;
  bio: string;
};

const ChangeAccountInfoForm = () => {
  const { data: sessionData } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeAccountInfoSchema>({
    defaultValues: {
      email: sessionData?.user.email ?? "",
    },
    mode: "onChange",
  });

  const [username, setUsername] = React.useState(sessionData?.user.name ?? "");
  const [email, setEmail] = React.useState(sessionData?.user.email ?? "");
  const [bio, setBio] = React.useState(sessionData?.user.bio ?? "");
  const [isEditingUsername, setIsEditingUsername] = React.useState(false);
  const [displayedUsername, setDisplayedUsername] = React.useState(
    sessionData?.user.name ?? ""
  );
  const [isEditingEmail, setIsEditingEmail] = React.useState(false);
  const [displayedEmail, setDisplayedEmail] = React.useState(
    sessionData?.user.email ?? ""
  );
  const [isEditingBio, setIsEditingBio] = React.useState(false);
  const [displayedBio, setDisplayedBio] = React.useState(
    sessionData?.user.bio ?? ""
  );

  // update username when sessionData changes
  useEffect(() => {
    setUsername(sessionData?.user.name ?? "");
    setEmail(sessionData?.user.email ?? "");
    setBio(sessionData?.user.bio ?? "");
  }, [sessionData]);

  const { mutateAsync: ChangeAccountInfo } =
    api.user.changeAccountInfo.useMutation();

  const submitHandler: SubmitHandler<ChangeAccountInfoSchema> = async (
    data
  ) => {
    await ChangeAccountInfo(data);
    setDisplayedEmail(data.email);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const toggleEditUsername = () => {
    setIsEditingUsername(v => !v);
  }
  const toggleEditEmail = () => {
    setIsEditingEmail(v => !v);
  }
  const toggleEditBio = () => {
    setIsEditingBio(v => !v);
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={c.form}>
      <div className={c.inputs}>
        <div className={c.txt_field}>
          <input
            disabled={!isEditingUsername}
            type="text"
            {...register("username", { required: true })}
            value={username}
            onChange={handleUsernameChange}
            data-error={!!errors.username}
            placeholder={`${sessionData?.user.name}`}
          />
          <div className={c.edit} onClick={toggleEditUsername}>
            {isEditingUsername ? <CheckRounded /> : <EditRounded />}
          </div>
        </div>
        <div className={c.txt_field}>
        <input
          type="text"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
          value={email}
          onChange={handleEmailChange}
          data-error={!!errors.email}
          placeholder={`${sessionData?.user.email}`}
          disabled={!isEditingEmail}
        />
        <div className={c.edit} onClick={toggleEditEmail}>
          {isEditingEmail ? <CheckRounded /> : <EditRounded />}
        </div>
        </div>
        <div className={c.txt_field + " " + c.bio}>
          <textarea
            {...register("bio", { maxLength: 100 })}
            value={bio}
            onChange={handleBioChange}
            data-error={!!errors.bio}
            placeholder={sessionData?.user.bio ?? "Write something about yourself"}
            disabled={!isEditingBio}
          />
          <div className={c.edit} onClick={toggleEditBio}>
            {isEditingBio ? <CheckRounded /> : <EditRounded />}
          </div>
        </div>
        {errors.email && (
          <span className={c.error}>{errors.email.message}</span>
        )}
        {errors.username && (
          <span className={c.error}>{errors.username.message}</span>
        )}
        {errors.bio && (
          <span className={c.error}>Bio cannot be longer than 100 characters</span>
        )}
        {/* {backendError && <span className={c.error}>{backendError}</span>} */}

        {/* <Link href="/user"> */}
        <button type="submit" className={common.submitButton}>
          Submit
        </button>
        {/* </Link> */}
      </div>
    </form>
  );
};

export default ChangeAccountInfoForm;
