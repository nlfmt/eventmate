import React, { useEffect, useRef } from "react";

import c from "./ChangeAccountInfo.module.scss";
import common from "@/styles/common.module.scss";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { ArrowBackRounded, CheckRounded, EditRounded } from "@mui/icons-material";
import Link from "next/link";
import { classes } from "@/utils/utils";

type ChangeAccountInfoSchema = {
  username: string;
  email: string;
  bio: string;
};

const ChangeAccountInfoForm = () => {
  const { data: sessionData } = useSession();

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const bioInputRef = useRef<HTMLTextAreaElement>(null);

  const { data: user } = api.user.get.useQuery({
    id: sessionData?.user.id ?? "",
  }, {
    enabled: !!sessionData?.user.id,
  });

  useEffect(() => {
    if (user && user.bio) {
      setBio(user.bio);
    }
  }, [user]);

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

  // useEffect(() => {
  //   if (usernameInputRef.current) {
  //     usernameInputRef.current.focus();
  //   }
  // }, []);

  const [username, setUsername] = React.useState(sessionData?.user.name ?? "");
  const [email, setEmail] = React.useState(sessionData?.user.email ?? "");
  const [bio, setBio] = React.useState<string | undefined>("");
  const [isEditingUsername, setIsEditingUsername] = React.useState(false);
  const [isEditingEmail, setIsEditingEmail] = React.useState(false);
  const [isEditingBio, setIsEditingBio] = React.useState(false);

  // update username when sessionData changes
  useEffect(() => {
    setUsername(sessionData?.user.name ?? "");
    setEmail(sessionData?.user.email ?? "");
  }, [sessionData]);

  const { mutateAsync: ChangeAccountInfo } =
    api.user.changeAccountInfo.useMutation();

  const submitHandler: SubmitHandler<ChangeAccountInfoSchema> = async (
    data
  ) => {
    await ChangeAccountInfo(data);
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
    setTimeout(() => {
      const nameInput = usernameInputRef.current;
      if (nameInput) {
        nameInput.focus();
        nameInput.setSelectionRange(0, nameInput.value.length);
      }
    }, 0);
  }
  const toggleEditEmail = () => {
    setIsEditingEmail((prevState) => !prevState);
    setTimeout(() => {
      const emailInput = emailInputRef.current;
      if (emailInput) {
        emailInput.focus();
        emailInput.setSelectionRange(0, emailInput.value.length);
      }
    }, 0);
  }
  const toggleEditBio = () => {
    setIsEditingBio(v => !v);
    setTimeout(() => {
      const bioInput = bioInputRef.current;
      if (bioInput) {
        bioInput.focus();
        bioInput.setSelectionRange(0, bioInput.value.length);
      }
    }, 0);
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={c.form}>
      <Link href="/account" className={c.header}>
        <ArrowBackRounded />
        <span>Change Account Info</span>
      </Link>
      <div className={c.inputs}>
        <div className={c.txt_field}>
          <input
            disabled={!isEditingUsername}
            type="text"
            {...register("username", { required: true })}
            value={username}
            onChange={handleUsernameChange}
            data-error={!!errors.username}
            placeholder={sessionData?.user.name ?? undefined}
            ref={usernameInputRef}
          />
          <div className={c.edit} onClick={toggleEditUsername}>
            {isEditingUsername ? <CheckRounded /> : <EditRounded />}
          </div>
        </div>
        <div className={c.txt_field}>
        <input
          type="text"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
          value={email}
          onChange={handleEmailChange}
          data-error={!!errors.email}
          placeholder={sessionData?.user.email ?? undefined}
          disabled={!isEditingEmail}
          id="emailInput"
          ref={emailInputRef}
        />
        <div className={c.edit} onClick={toggleEditEmail}>
          {isEditingEmail ? <CheckRounded /> : <EditRounded />}
        </div>
        </div>
        <div className={classes(c.txt_field, c.bio)}>
          <textarea
            {...register("bio", { maxLength: 100 })}
            value={bio}
            onChange={handleBioChange}
            data-error={!!errors.bio}
            placeholder={bio || "Enter a bio..."}
            disabled={!isEditingBio}
            ref={bioInputRef}
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

        <button type="submit" className={common.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ChangeAccountInfoForm;
