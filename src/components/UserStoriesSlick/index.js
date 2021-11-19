import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import StoryModal from '../StoryModal'
import AddStoryModal from '../AddStoryModal'
import YourStory from '../YourStory'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 8,
        infinite: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7,
        initialSlide: 7,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 6,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 5,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
  ],
}

class UserStoriesSlick extends Component {
  state = {
    showModal: false,
    selectedStoryId: '',
  }

  //   showFailureView = () => {
  //     const {userStoriesStatus} = this.props
  //     userStoriesStatus()
  //   }

  addNewYourStory = story => {
    const {setNewStory} = this.props
    const updatedStory = {
      id: story.id,
      storyImage: story.story_image,
      caption: story.caption,
    }
    setNewStory(updatedStory)
  }

  onClickStory = userId => {
    this.setState({selectedStoryId: userId, showModal: true})
  }

  onCloseModal = () => {
    this.setState({showModal: false})
  }

  renderSlider = () => {
    const {stories} = this.props
    const {storiesList, myStory} = stories
    return (
      <Slider {...settings}>
        {myStory !== null ? (
          <YourStory yourStory={myStory} key={myStory.id} />
        ) : (
          <AddStoryModal addNewYourStory={this.addNewYourStory} key="abcde" />
        )}

        {storiesList.map(story => (
          <div className="react-slick-item" key={story.userId}>
            <button
              type="button"
              onClick={() => this.onClickStory(story.userId)}
            >
              <img
                className="poster"
                src={story.profilePic}
                width="100%"
                height="100%"
                alt="user story"
              />
              <p className="story-username">{story.userName}</p>
            </button>
          </div>
        ))}
      </Slider>
    )
  }

  renderView = () => {
    const {showModal, selectedStoryId} = this.state
    const {status} = this.props
    if (status === 'success') {
      return (
        <>
          <div style={{width: '80%'}}>{this.renderSlider()}</div>
          {showModal ? (
            <StoryModal
              userId={selectedStoryId}
              onCloseModal={this.onCloseModal}
            />
          ) : (
            ''
          )}
        </>
      )
    }

    return ''
  }

  render() {
    const {status} = this.props
    console.log(status)
    return (
      <div className="slick-app-container">
        {status === 'loading' ? (
          <div testid="userStoriesLoader">
            <Loader type="ThreeDots" color="blue" />
          </div>
        ) : (
          this.renderView()
        )}
      </div>
    )
  }
}

export default UserStoriesSlick
