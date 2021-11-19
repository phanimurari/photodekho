import {Link} from 'react-router-dom'
import Header from '../Header'

const NotFoundRoute = () => {
  const renderNotFoundDisplay = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>we are sorry, the page you requested could not be found</p>
      <p>Please go back to the homepage.</p>
      <Link to="/">
        <button type="button">Home Page</button>
      </Link>
    </div>
  )

  return (
    <>
      <Header />
      <div>{renderNotFoundDisplay()}</div>
    </>
  )
}

export default NotFoundRoute
