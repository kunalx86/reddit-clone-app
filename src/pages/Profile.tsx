import { useAuth } from "../hooks/auth"

const Profile = () => {
  const { isLoggedIn, isLoading, user } = useAuth();
  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  return (
    <div>
      Profile page
      { isLoggedIn ? user.username : "Not logged in" }
    </div> 
  )
}

export default Profile;