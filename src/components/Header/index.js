import {Component} from 'react'
import {AiFillHome, AiOutlineHome} from 'react-icons/ai'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import UserAddPostModal from '../UserAddPostModal'
import ProfileIconStrap from '../ProfileIconStrap'
import './index.css'

class Header extends Component {
  onChangeSearch = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  render() {
    const {search} = this.props
    return (
      <nav className="header-navbar">
        <Link to="/">
          <img src="./img/photoDekhLogo.svg" alt="website logo" />
          <p>Photo Dekho</p>
        </Link>
        <input
          type="search"
          className="search"
          placeholder="Search"
          value={search}
          onChange={this.onChangeSearch}
        />
        <FaSearch testid="searchIcon" />
        <Link to="/">
          <button
            type="button"
            className="transparent-button"
            testid="homeFilled"
          >
            <AiFillHome />
          </button>
        </Link>

        <Link to="/">
          <AiOutlineHome testid="homeOutline" />
        </Link>
        <ProfileIconStrap />
        <UserAddPostModal />
      </nav>
    )
  }
}

export default Header
