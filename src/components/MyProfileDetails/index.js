import './index.css'
import FollowStrapComponent from '../FollowStrapComponent'

const MyProfileDetails = props => {
  const {profileDetails, onClickEditProfile, isFollow, altText} = props
  const {
    profilePic,
    userName,
    followersCount,
    postsCount,
    followingCount,
    userBio,
    userId,
  } = profileDetails

  return (
    <div>
      <div>
        <img src={profilePic} alt={altText} className="profile-image" />
      </div>
      <div>
        <div>
          <h1>{userId}</h1>
          <p>{userName}</p>
          {isFollow ? (
            <FollowStrapComponent name={userName} img={profilePic} />
          ) : (
            <button type="button" onClick={onClickEditProfile}>
              Edit Profile
            </button>
          )}
        </div>
        <div>
          <p>{postsCount} Posts</p>
          <p>{followersCount} followers</p>
          <p>{followingCount} following</p>
        </div>
        <div>
          <p>{userBio}</p>
        </div>
      </div>
    </div>
  )
}

export default MyProfileDetails
