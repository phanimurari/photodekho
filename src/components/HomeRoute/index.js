import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import UserStoriesSlick from '../UserStoriesSlick'
import FriendPost from '../FriendPost'

import './index.css'
import FailureView from '../FailureView'

class HomeRoute extends Component {
  state = {
    friendPostsList: [],
    search: '',
    isLoading: 'loading',
    stories: [],
    storiesStatus: 'loading',
  }

  componentDidMount() {
    this.getStoriesList()
    this.getFriendsPostsList()
  }

  getStoriesList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({storiesStatus: 'loading'})
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.users_stories.map(eachItem => ({
        userId: eachItem.user_id,
        userName: eachItem.user_name,
        profilePic: eachItem.profile_pic,
      }))
      let myStory
      if (data.my_story !== null) {
        myStory = {
          id: data.my_story.id,
          storyImage: data.my_story.story_image,
          caption: data.my_story.caption,
        }
      } else {
        myStory = null
      }
      myStory = data.my_story
      this.setState({
        stories: {storiesList: updatedData, myStory},
        storiesStatus: 'success',
      })
    } else {
      this.setState({storiesStatus: 'failure'})
    }
  }

  getFriendsPostsList = async () => {
    const {search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url =
      search === ''
        ? 'https://apis.ccbp.in/insta-posts'
        : `https://apis.ccbp.in/insta-posts?search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({isLoading: 'loading'})
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.posts.map(eachItem => ({
        postId: eachItem.post_id,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
        profilePic: eachItem.profile_pic,
        postDetails: {
          imageUrl: eachItem.post_details.image_url,
          caption: eachItem.post_details.caption,
        },
        commentsCount: eachItem.comments_count,
        likesCount: eachItem.likes_count,
        createdAt: eachItem.created_at,
        isLiked: false,
        comments: eachItem.comments.map(comment => ({
          comment: comment.comment,
          userId: comment.user_id,
          userName: comment.user_name,
        })),
      }))
      this.setState({friendPostsList: updatedData, isLoading: 'success'})
    } else {
      this.setState({isLoading: 'failure'})
    }
  }

  //   userStoriesStatus = () => {
  //     this.setState({isLoading: 'failure'})
  //   }

  setNewStory = story => {
    this.setState(prevState => ({
      stories: {...prevState.stories, myStory: story},
    }))
  }

  renderStories = () => {
    const {stories, storiesStatus} = this.state
    return (
      <div className="stories-container">
        <UserStoriesSlick
          setNewStory={this.setNewStory}
          stories={stories}
          status={storiesStatus}
        />
      </div>
    )
  }

  renderAddedComment = (commentDetails, postId) => {
    this.setState(prevState => ({
      friendPostsList: prevState.friendPostsList.map(eachItem => {
        if (eachItem.postId === postId) {
          return {
            ...eachItem,
            comments: [...eachItem.comments, commentDetails],
            commentsCount: eachItem.commentsCount + 1,
          }
        }
        return eachItem
      }),
    }))
  }

  renderFriendPosts = () => {
    const {friendPostsList, search} = this.state
    if (friendPostsList.length === 0 && search !== '') {
      return (
        <>
          <img src="./img/noSearch.svg" alt="search not found" />
          <h1>Search Not Found</h1>
          <p>Try different keyword or search again</p>
        </>
      )
    }
    return (
      <ul>
        {friendPostsList.map(eachItem => (
          <FriendPost
            friendPostDetails={eachItem}
            renderAddedComment={this.renderAddedComment}
            key={eachItem.postId}
          />
        ))}
      </ul>
    )
  }

  tryAgainApiCall = () => {
    this.setState({isLoading: 'loading'}, this.getFriendsPostsList)
  }

  renderView = () => {
    const {isLoading, search} = this.state
    if (isLoading === 'success') {
      return (
        <div className="home-bg-container">
          {search === '' ? this.renderStories() : <h1>Search Results</h1>}
          {this.renderFriendPosts()}
        </div>
      )
    }
    return <FailureView tryAgainApiCall={this.tryAgainApiCall} />
  }

  changeSearchInput = search => {
    this.setState({search}, this.getFriendsPostsList)
  }

  render() {
    const {search, isLoading} = this.state
    return (
      <>
        <Header changeSearchInput={this.changeSearchInput} search={search} />

        {isLoading === 'loading' ? (
          <div>
            {search === '' ? (
              <>
                <div testid="postListLoader">
                  <Loader type="ThreeDots" color="blue" />
                </div>
              </>
            ) : (
              <div testid="searchPostsLoader">
                <Loader type="ThreeDots" color="blue" />
              </div>
            )}
          </div>
        ) : (
          this.renderView()
        )}
      </>
    )
  }
}

export default HomeRoute
