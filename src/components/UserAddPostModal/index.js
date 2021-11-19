import Cookies from 'js-cookie'
import Modal from 'react-modal'
import {IoMdClose} from 'react-icons/io'
import {Component} from 'react'

class UserAddPostModal extends Component {
  state = {isModalOpen: false}

  onModalOpen = () => {
    this.setState({isModalOpen: true})
  }

  onClickClose = () => {
    this.setState({isModalOpen: false})
  }

  addYourPost = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-posts'
    const postDetails = {
      post_image:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-1-img.png',
      caption: 'test post',
    }
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(postDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data.post)
    }
  }

  render() {
    const {isModalOpen} = this.state
    return (
      <>
        <button type="button" onClick={this.onModalOpen}>
          Add Post
        </button>
        <Modal
          isOpen={isModalOpen}
          className="Modal"
          overlayClassName="Overlay"
        >
          <div>
            <IoMdClose onClick={this.onClickClose} />
            <button type="button" onClick={this.addYourPost}>
              Add Post
            </button>
          </div>
        </Modal>
      </>
    )
  }
}

export default UserAddPostModal
