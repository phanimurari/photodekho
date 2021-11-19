import {Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Counter extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const loginUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({errorMsg: ''})
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  setButton = () => {
    const {username, password} = this.state
    if (username !== '' && password !== '') {
      return <button type="submit">Login</button>
    }

    return (
      <button type="submit" disabled>
        Login
      </button>
    )
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <Container>
          <Row>
            <Col sm="7">
              <img
                src="https://res.cloudinary.com/dwlftsdge/image/upload/v1633344526/PhotoDekh/OBJECTS_2x_sjesj3.jpg"
                className="login-image"
                alt="website login"
              />
            </Col>
            <Col sm="5">
              <div className="form-container">
                <img src="./img/photoDekhLogo.svg" alt="website logo" />
                <h1>Photo Dekho</h1>
                <Form onSubmit={this.onSubmitForm}>
                  <FormGroup>
                    <Label htmlFor="username">USERNAME</Label>
                    <Input
                      type="text"
                      id="username"
                      value={username}
                      onChange={this.onChangeUsername}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">PASSWORD</Label>
                    <Input
                      type="password"
                      id="password"
                      value={password}
                      onChange={this.onChangePassword}
                    />
                  </FormGroup>
                  <p>{errorMsg}</p>
                  {this.setButton()}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Counter
