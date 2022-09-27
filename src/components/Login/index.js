import {Redirect, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Login = props => {
  console.log(props)
  const OnSuccessLogin = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }
  const onClickLogin = async () => {
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      OnSuccessLogin(data.jwt_token)
    }
  }
  const token = Cookies.get('jwt_token')

  if (token !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <>
      <div className="login-container">
        <h1>Please Login</h1>
        <button type="button" onClick={onClickLogin}>
          Login with Sample Creds
        </button>
      </div>
    </>
  )
}

export default withRouter(Login)
