import Modal from 'react-modal'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {IoMdClose} from 'react-icons/io'

class AddStoryModal extends Component {
  state = {isModalOpen: false}

  addYourStory = async () => {
    const {addNewYourStory} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-stories'
    const storyDetails = {
      story_image:
        'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/stories/instagram-mini-project-story-1-img.png',
      caption: 'test story',
    }
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(storyDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      addNewYourStory(data.my_story)
    }
  }

  onModalOpen = () => {
    this.setState({isModalOpen: true})
  }

  onClickClose = () => {
    this.setState({isModalOpen: false})
  }

  render() {
    const {isModalOpen} = this.state

    return (
      <div>
        <div className="react-slick-item">
          <button type="button" onClick={this.onModalOpen}>
            <img
              className="poster"
              src="./img/sampleProfileImage.svg"
              width="100%"
              height="100%"
              alt="poster"
            />
            <p className="story-username">Your story</p>
          </button>
        </div>
        <Modal
          isOpen={isModalOpen}
          className="Modal"
          overlayClassName="Overlay"
        >
          <div>
            <button type="button" testid="closeIcon">
              <IoMdClose onClick={this.onClickClose} />
            </button>
            <button type="button" onClick={this.addYourStory}>
              Add Story
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default AddStoryModal
