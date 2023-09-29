import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Profile.module.scss";
import ProfileForm from "./profile-form";

const Profile = () => {
  return (
    <div className={styles.profile}>
      <ProfileForm />
    </div>
  );
};

export default Profile;
