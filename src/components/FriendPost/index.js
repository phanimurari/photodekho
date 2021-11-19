import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {Link} from 'react-router-dom'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import LikesContext from '../../context'
import './index.css'

class FriendPost extends Component {
  state = {commentText: ''}

  changeComment = event => {
    this.setState({commentText: event.target.value})
  }

  renderAddedComment = () => {
    const {commentText} = this.state
    const {renderAddedComment, friendPostDetails} = this.props
    const {userId, userName, postId} = friendPostDetails
    const commentDetails = {
      comment: commentText,
      userId,
      userName,
    }
    renderAddedComment(commentDetails, postId)
    this.setState({commentText: ''})
  }

  addComment = async () => {
    const {friendPostDetails} = this.props
    const {postId} = friendPostDetails
    const {commentText} = this.state
    const url = `https://apis.ccbp.in/insta-posts/${postId}/comment`
    const jwtToken = Cookies.get('jwt_token')
    const postDetails = {
      comment_text: commentText,
    }
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(postDetails),
    }
    if (commentText !== '') {
      const response = await fetch(url, options)
      if (response.ok) {
        this.renderAddedComment()
      }
    }
  }

  likeApiCall = async status => {
    const {friendPostDetails} = this.props
    const {postId} = friendPostDetails
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-posts/${postId}/like`
    const likeStatus = {
      like_status: status,
    }
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(likeStatus),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
    }
  }

  render() {
    const {friendPostDetails} = this.props
    const {
      postId,
      userId,
      userName,
      profilePic,
      postDetails,
      commentsCount,
      likesCount,
      comments,
      createdAt,
    } = friendPostDetails
    const {commentText} = this.state
    return (
      <LikesContext.Consumer>
        {value => {
          const {likesStatusList, changeLikeStatus} = value

          const isPostLiked = () => {
            const postObject = likesStatusList.find(
              eachItem => eachItem.id === postId,
            )
            if (postObject === undefined) {
              return false
            }
            return postObject.status
          }
          const isLiked = isPostLiked()
          const onClickLike = () => {
            if (isLiked) {
              changeLikeStatus(postId, false)
              this.likeApiCall(false)
            } else {
              changeLikeStatus(postId, true)
              this.likeApiCall(true)
            }
          }
          const renderProfileDetails = () => (
            <Link to={`/user/${userId}`}>
              <div className="friend-profile-container">
                <img
                  src={profilePic}
                  className="friend-profile-image"
                  alt="post author profile"
                />
                <p>{userName}</p>
              </div>
            </Link>
          )

          const renderUserActions = () => (
            <div className="user-actions-icons">
              {isLiked ? (
                <button type="button" onClick={onClickLike} testid="unLikeIcon">
                  <FcLike />
                </button>
              ) : (
                <button type="button" onClick={onClickLike} testid="likeIcon">
                  <BsHeart />
                </button>
              )}
              <button type="button" testid="commentIcon">
                <FaRegComment />
              </button>
              <button type="button" testid="shareIcon">
                <BiShareAlt />
              </button>
            </div>
          )

          const renderPostPopularity = () => (
            <div>
              <p>{isLiked ? likesCount + 1 : likesCount} likes</p>
              <p>{postDetails.caption}</p>
              <p>View all {commentsCount} comments</p>
            </div>
          )

          const renderComments = () => (
            <ul>
              {comments.map(eachItem => (
                <li key={eachItem.userId}>
                  <Link to={`/user/${eachItem.userId}`}>
                    <span>{eachItem.userName}</span>
                  </Link>
                  <p>{eachItem.comment}</p>
                </li>
              ))}
            </ul>
          )

          const renderAddCommentSection = () => (
            <div>
              <img
                src={profilePic}
                className="friend-profile-image"
                alt="my profile"
              />
              <input
                type="text"
                onChange={this.changeComment}
                value={commentText}
                placeholder="Add a comment..."
              />
              {commentText === '' ? (
                <button type="button" disabled>
                  Post
                </button>
              ) : (
                <button type="button" onClick={this.addComment}>
                  Post
                </button>
              )}
            </div>
          )

          return (
            <li className="friend-post-bg-container" testid="postItem">
              {renderProfileDetails()}
              <div className="post-container">
                <img
                  src={postDetails.imageUrl}
                  className="post-image"
                  alt="post"
                />
              </div>
              <div className="friend-post-content-container">
                {renderUserActions()}
                {renderPostPopularity()}
                {renderComments()}
                <p>{createdAt}</p>
              </div>
              {renderAddCommentSection()}
            </li>
          )
        }}
      </LikesContext.Consumer>
    )
  }
}

export default FriendPost
