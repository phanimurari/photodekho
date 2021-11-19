import Header from '../Header'

const FailureView = props => {
  const {tryAgainApiCall} = props
  const onClickTryAgain = () => {
    tryAgainApiCall()
  }
  const renderFailureViewDisplay = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={onClickTryAgain}>
        Try again
      </button>
    </div>
  )

  return (
    <>
      <div>{renderFailureViewDisplay()}</div>
    </>
  )
}

export default FailureView
