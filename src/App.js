import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import ProtectedRoute from './components/ProtectedRoute'
import MyProfile from './components/MyProfile'
import EditProfile from './components/EditProfile'
import UserDetailsRoute from './components/UserDetailsRoute'
import NotFoundRoute from './components/NotFoundRoute'
import LikesContext from './context'
import './App.css'

class App extends Component {
  state = {likesStatusList: []}

  changeLikeStatus = (id, status) => {
    const {likesStatusList} = this.state
    console.log(likesStatusList)
    const postObject = likesStatusList.find(eachItem => eachItem.id === id)
    if (postObject === undefined) {
      this.setState(prevState => ({
        likesStatusList: [...prevState.likesStatusList, {id, status}],
      }))
    } else {
      this.setState(prevState => ({
        likesStatusList: prevState.likesStatusList.map(eachObj => {
          if (eachObj.id === id) {
            return {...eachObj, status}
          }
          return eachObj
        }),
      }))
    }
    console.log(id, status)
  }

  render() {
    const {likesStatusList} = this.state
    return (
      <LikesContext.Provider
        value={{
          likesStatusList,
          changeLikeStatus: this.changeLikeStatus,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/edit-profile" component={EditProfile} />
          <ProtectedRoute exact path="/user/:id" component={UserDetailsRoute} />
          <Route exact path="/not-found" component={NotFoundRoute} />
          <Redirect to="not-found" />
        </Switch>
      </LikesContext.Provider>
    )
  }
}
export default App
