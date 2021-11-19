import Modal from 'react-modal'
import {IoMdClose} from 'react-icons/io'
import {Component} from 'react'

class YourStory extends Component {
  state = {isModalOpen: false}

  onModalOpen = () => {
    this.setState({isModalOpen: true})
  }

  onClickClose = () => {
    this.setState({isModalOpen: false})
  }

  render() {
    const {yourStory} = this.props
    const {id, storyImage, caption} = yourStory
    const {isModalOpen} = this.state
    return (
      <>
        <div className="react-slick-item" key={id}>
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
          <div testid="userStoryModal">
            <IoMdClose onClick={this.onClickClose} />
            <h1>Stories</h1>
            <img
              className="poster"
              src="./img/sampleProfileImage.svg"
              width="100%"
              height="100%"
              alt="user story profile"
            />
            <span className="story-username">Rahul</span>
            <img src={storyImage} alt="user story" />
            <span className="story-username">{caption}</span>
          </div>
        </Modal>
      </>
    )
  }
}

export default YourStory
