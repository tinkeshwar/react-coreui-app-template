import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import DashboardPage from './page/DashboardPage'
import LoginPage from './page/LoginPage'
import NotFoundPage from './page/NotFound'
import LogoutPage from './page/LogoutPage'
import UserPage from './page/UserPage'
import PasswordForgetPage from './page/PasswordForgetPage'
import PasswordResetPage from './page/PasswordResetPage'
import ServerErrorPage from './page/ServerError'
import ProfilePage from './page/ProfilePage'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact><LoginPage/></Route>
        <Route path='/logout' exact><LogoutPage/></Route>
        <Route path='/forget' exact><PasswordForgetPage/></Route>
        <Route path='/password-reset' exact><PasswordResetPage/></Route>
        <Route path='/dashboard' exact><DashboardPage/></Route>
        <Route path='/profile' exact><ProfilePage/></Route>
        <Route path='/profile/:type'><ProfilePage/></Route>
        <Route path='/user-management/:type/list'><UserPage/></Route>
        <Route path='/server-error' exact><ServerErrorPage/></Route>
        <Route path='*'><NotFoundPage /></Route>
      </Switch>
    </Router>
  )
}

export default App
