import {Component} from 'react'

import {Button, Popover, PopoverBody} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'

class FollowStrapComponent extends Component {
  state = {
    popoverOpen: false,
  }

  toggle = () => {
    const {popoverOpen} = this.state

    this.setState({
      popoverOpen: !popoverOpen,
    })
  }

  onClickUnfollow = () => {
    console.log('unfollow')
  }

  render() {
    const {popoverOpen} = this.state

    const {name, img} = this.props

    return (
      <div>
        <Button id="Popover1" type="button" className="button-styles">
          Follow
        </Button>
        <Popover
          placement="bottom"
          isOpen={popoverOpen}
          target="Popover1"
          toggle={this.toggle}
        >
          <PopoverBody>
            <div className="pop-over-body">
              <div>
                <img src={img} alt="profile-pic" />
                <button type="button" onClick={this.toggle}>
                  close
                </button>
              </div>
              <p>{name}</p>
              <div className="options">
                <button
                  onClick={this.onClickUnfollow}
                  className="button-option"
                  type="button"
                >
                  Unfollow
                </button>
                <hr />
                <button
                  onClick={this.toggle}
                  className="button-option"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}

export default FollowStrapComponent
