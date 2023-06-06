import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useParams,
  NavLink,
} from 'react-router-dom'

function App() {
  return (
    <div>
      <h1>React Router Dom6</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/users" component={UsersLayout} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

function MainPage() {
  return <h1>Main Page</h1>
}

function UsersLayout() {
  const { path } = useRouteMatch()
  return (
    <>
      <h1>Users Layout</h1>
      <Switch>
        <Route path={path + '/:userId/profile'} component={UserProfilePage} />
        <Route path={path + '/:userId/edit'} component={EditUserPage} />
        <Route path={path} exact component={UserListPage} />
        <Redirect from={path + '/:userId'} to={path + '/:userId/profile'} />
      </Switch>
    </>
  )
}

function UserProfilePage() {
  const { userId } = useParams()
  return (
    <div>
      <h1>UserPage</h1>
      <p>userId: {userId}</p>
    </div>
  )
}

function EditUserPage() {
  return <h1>Edit User Page</h1>
}

function UserListPage() {
  const users = [
    { id: 1, title: 'user 1' },
    { id: 2, title: 'user 2' },
    { id: 3, title: 'user 3' },
    { id: 4, title: 'user 4' },
    { id: 5, title: 'user 5' },
  ]

  const { path } = useRouteMatch()

  return (
    <>
      <h1>User List Page</h1>
      {users.map((user) => (
        <p key={user.id}>
          {user.title}
          <NavLink to={`${path}/${user.id}`}>Пользователь</NavLink>
        </p>
      ))}
    </>
  )
}

export default App
