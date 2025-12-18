import { useGetUser, useUpdateUser } from "@/api/UserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfilePage = () => {
  const { isAuthenticated } = useAuth0();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();
  const { currentUser, isLoading: isGetLoading } = useGetUser();

  if (!isAuthenticated) {
    return <p>Please log in to view your profile.</p>;
  }
  if (isGetLoading) {
    return <p>Loading...</p>;
  }
  if (!currentUser) {
    return <p>Unable to load user profile</p>;
  }
  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
