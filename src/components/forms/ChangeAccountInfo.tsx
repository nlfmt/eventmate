import React from "react";

import c from "./ChangeAccountInfo.module.scss";
import common from "@/styles/common.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { CheckRounded, EditRounded } from "@mui/icons-material";

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
  } = useForm<ChangeAccountInfoSchema>();

  const [username, setUsername] = React.useState(sessionData?.user.name ?? "");
  const [email, setEmail] = React.useState(sessionData?.user.email ?? "");
  const [bio, setBio] = React.useState(sessionData?.user.bio ?? "");
  const [isEditingUsername, setIsEditingUsername] = React.useState(false);
  const [displayedUsername, setDisplayedUsername] = React.useState(sessionData?.user.name ?? "");
  const [isEditingEmail, setIsEditingEmail] = React.useState(false);
  const [displayedEmail, setDisplayedEmail] = React.useState(sessionData?.user.email ?? "");
  const [isEditingBio, setIsEditingBio] = React.useState(false);
  const [displayedBio, setDisplayedBio] = React.useState(sessionData?.user.bio ?? "");

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

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleEditUsername = () => {
    setIsEditingUsername(true);
  };

  const handleSaveUsername = () => {
    setIsEditingUsername(false);
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleSaveEmail = () => {
    setIsEditingEmail(false);
    // setEmail(email);
  };

  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleSaveBio = () => {
    setIsEditingBio(false);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={c.form}>
        <div className={c.inputs}>
        <div className={c.txt_field}>
          {isEditingUsername ? (
            <>
            <input
              type="text"
              {...register("username", { required: true })}
              value={username}
              onChange={handleUsernameChange}
              data-error={!!errors.username}
              placeholder={`${sessionData?.user.name}`}
            />
            <div className={c.edit} onClick={handleSaveUsername}>
              <CheckRounded />
            </div>
            </>
          ) : (
            <>
              <label className={c.label}>{displayedUsername}{sessionData?.user.name}</label>
              <div className={c.edit} onClick={handleEditUsername}>
                <EditRounded />
              </div>
            </>
          )}
          </div>
          <div className={c.txt_field}>
          {isEditingEmail ? (
            <>
              <input
                type="text"
                {...register("email", { required: true })}
                value={email}
                onChange={handleEmailChange}
                data-error={!!errors.email}
                placeholder={`${sessionData?.user.email}`}
              />
              <div className={c.edit} onClick={handleSaveEmail}>
                <CheckRounded />
              </div>
            </>
          ) : (
            <>
              <label className={c.label}>{displayedEmail}{sessionData?.user.email}</label>
              <div className={c.edit} onClick={handleEditEmail}>
                <EditRounded />
              </div>
            </>
          )}
        </div>
        <div className={c.txt_field}>
          <input
            type="text"
            {...register("bio", { required: true })}
            value={bio}
            onChange={handleBioChange}
            data-error={!!errors.bio}
          />
          <label className={c.label}>My bio <br />{bio}</label>
        </div>
        <button type="submit" className={common.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ChangeAccountInfoForm;
