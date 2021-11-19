import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import MyProfileDetails from '../MyProfileDetails'
import ListOfStories from '../ListOfStories'
import ListOfPosts from '../ListOfPosts'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserDetailsRoute extends Component {
  state = {
    profileDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMyProfileDetails()
  }

  onClickEditProfile = () => {
    const {history} = this.props
    history.replace('/edit-profile')
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

  getFormattedPostsAndStoryListData = data => ({
    id: data.id,
    image: data.image,
  })

  getMyProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/insta-users/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedProfileDeatilsData = this.getFormattedData(
        fetchedData.user_details,
      )

      const updatedFormattedPostsList = fetchedData.user_details.posts.map(
        eachPost => this.getFormattedPostsAndStoryListData(eachPost),
      )

      const updatedFormattedStoriesList = fetchedData.user_details.stories.map(
        eachStory => this.getFormattedPostsAndStoryListData(eachStory),
      )

      const updatedData = {
        updatedProfileDeatilsData,
        updatedFormattedPostsList,
        updatedFormattedStoriesList,
      }

      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div
      className="products-details-loader-container"
      testid="userProfileLoader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfileDetailsView = () => {
    const {profileDetails} = this.state

    const {
      updatedProfileDeatilsData,
      updatedFormattedPostsList,
      updatedFormattedStoriesList,
    } = profileDetails

    return (
      <div>
        <MyProfileDetails
          profileDetails={updatedProfileDeatilsData}
          onClickEditProfile={this.onClickEditProfile}
          isFollow
          altText="user profile"
        />
        <ListOfStories
          storiesList={updatedFormattedStoriesList}
          altText="user story"
        />
        {updatedFormattedStoriesList.length > 0 ? (
          <>
            <div>
              <h1>Posts</h1>
              <BsGrid3X3 testid="postsIcon" />
            </div>
            <ListOfPosts
              postsList={updatedFormattedPostsList}
              altText="user post"
            />
          </>
        ) : (
          <div>
            <h1>No Posts</h1>
            <BiCamera testid="noPosts" />
          </div>
        )}
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getMyProfileDetails}>
        Try again
      </button>
    </div>
  )

  renderAllProfileDetails = () => {
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

  render() {
    return (
      <>
        <Header />
        <div>{this.renderAllProfileDetails()}</div>
      </>
    )
  }
}

export default UserDetailsRoute
