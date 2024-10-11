import { useGetUser, useUpdateUser } from '@/api/UserApi'
import UserProfileForm from '@/forms/user-profile-form/UserProfileForm'


const UserProfilePage = () => {
    const { updateUser, isLoading: isUpdateLoading } = useUpdateUser()
    const { currentUser, isLoading: isGetLoading } = useGetUser()
    
    if (isGetLoading) {
        return <p>Loading...</p>
    }
    if (!currentUser) {
        return <p>Unable to load user profile</p>
    }
    return (
        <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />
    )
}

export default UserProfilePage