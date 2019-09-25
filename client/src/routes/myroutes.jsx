import React from 'react'
import '../index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from '../components/register/Register'
import SignIn from '../components/signIn/SignIn'
import AddComment from '../components/comments/AddComment'
import Landing from '../components/landing/Landing'
import View from '../components/View'

export default class MyRoutes extends React.Component {
  constructor() {
    super()
    this.state = {
      users: [
        {
          first_name: 'steve'
        }
      ]
    }
  }

  getuser = x => {
    this.setState({
      users: x
    })
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/addcomment' component={AddComment} />
            <Route exact path='/profile/:id' component={View} />
          </Switch>
        </Router>
      </div>
    )
  }
}
