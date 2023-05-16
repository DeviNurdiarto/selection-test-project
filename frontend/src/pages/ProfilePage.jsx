import React from "react";
import UserProfileCard from "../components/UserProfileCard";

const DummyUserProfile = () => {
  const userData = {
    profilePicture:
      "https://www.seekpng.com/png/detail/506-5061704_cool-profile-avatar-picture-cool-picture-for-profile.png",
    fullName: "John Doe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    username: "johndoe",
    email: "johndoe@example.com",
  };

  return <UserProfileCard {...userData} />;
};

export default DummyUserProfile;
