import {Component} from 'react'
import Cookies from 'js-cookie'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class EditProfile extends Component {
  state = {
    userName: '',
    bio: '',
    phoneNumber: '',
    gender: 'MALE',
    apiStatus: apiStatusConstants.initial,
    profileDetails: {},
  }

  constructor(props) {
    super(props)
    this.toastMessage = 'Enter a Valid Bio'
  }

  componentDidMount() {
    this.getMyProfileDetails()
  }

  getFormattedData = data => ({
    id: data.id,
    userId: data.user_id,
    userName: data.user_name,
    profilePic: data.profile_pic,
    followersCount: data.followers_count,
    followingCount: data.following_count,
    userBio: data.user_bio,
    postsCount: data.posts_count,
  })

  getMyProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/insta-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      console.log(fetchedData)

      const updatedProfileDeatilsData = this.getFormattedData(
        fetchedData.profile,
      )
      this.setState({
        profileDetails: updatedProfileDeatilsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  updateProfileDetails = async event => {
    event.preventDefault()

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/insta-profile'

    const {userName, bio, gender, phoneNumber} = this.state

    console.log(userName, 'state')

    const userDetails = {
      user_name: userName,
      bio,
      gender,
      phone_number: phoneNumber,
    }

    console.log(JSON.stringify(userDetails))

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)

    const toastSuccess = 'Profile Updated Successfully'
    const toastFailure = 'Enter a Valid Bio'

    if (response.ok) {
      await response.json()
      this.toastMessage = toastSuccess
    } else {
      this.toastMessage = toastFailure
    }
  }

  notifyToster = () =>
    toast.success(`${this.toastMessage}`, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })

  renderEditProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderFailureView = () => <div>Failure</div>

  renderLoadingView = () => (
    <div
      className="products-details-loader-container"
      testid="editProfileLoader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onChangeUserName = event => {
    const username = event.target.value

    this.setState({userName: username})
  }

  onChangeBio = event => {
    const bioOfUser = event.target.value

    this.setState({bio: bioOfUser})
  }

  onChangeGender = event => {
    const gender = event.target.value
    this.setState({gender})
  }

  onChangePhoneNumber = event => {
    const phoneNumber = event.target.value
    this.setState({phoneNumber})
  }

  renderProfileDetailsView = () => {
    const {phoneNumber, userName, bio, id, profileDetails} = this.state

    const {profilePic} = profileDetails

    return (
      <div>
        <form onSubmit={this.updateProfileDetails}>
          <h1>Edit Profile</h1>
          <div>
            <img src={profilePic} alt="edit profile route profile pic" />
            <p>{userName}</p>
          </div>
          <div>
            <label htmlFor="username">User Name</label>
            <input
              value={userName}
              id="username"
              onChange={this.onChangeUserName}
            />
          </div>
          <div>
            <label htmlFor="userid">User Id</label>
            <p>{id}</p>
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <input value={bio} id="bio" onChange={this.onChangeBio} />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              value={phoneNumber}
              id="phone"
              onChange={this.onChangePhoneNumber}
            />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select id="gender" onChange={this.onChangeGender}>
              <option>MALE</option>
              <option>FEMALE</option>
              <option>OTHER</option>
            </select>
          </div>
          <button type="submit" onClick={this.notifyToster}>
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    )
  }

  render() {
    return <div>{this.renderEditProfile()}</div>
  }
}

export default EditProfile
