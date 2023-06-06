import React from 'react'
import {
  useParams,
  NavLink,
  Outlet,
  Navigate,
  useRoutes,
} from 'react-router-dom'

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: 'users',
      element: <UsersLayout />,
      children: [
        {
          index: true,
          element: <UserListPage />,
        },
        {
          path: ':userId',
          element: <Outlet />,
          children: [
            {
              path: 'profile',
              element: <UserProfilePage />,
            },
            {
              path: 'edit',
              element: <EditUserPage />,
            },
            {
              path: '*',
              element: <Navigate to="../profile" />,
            },
            {
              index: true,
              element: <Navigate to="./profile" />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ])
  return (
    <div>
      <h1>React Router Dom6</h1>
      <hr />
      <h1>App Layout</h1>
      <NavLink to="/users">User List Layout</NavLink>
      {routes}
    </div>
  )
}

function MainPage() {
  return <h1>Main Page</h1>
}

function UsersLayout() {
  return (
    <>
      <h1>Users Layout</h1>
      <NavLink to="/">Main Page</NavLink>
      <Outlet />
    </>
  )
}

function UserProfilePage() {
  const { userId } = useParams()

  return (
    <div>
      <h1>UserPage</h1>
      <li>
        <NavLink to="/users">User List Page</NavLink>
      </li>
      <li>
        <NavLink to={`/users/${userId}/edit`}>Edit this user</NavLink>
      </li>
      {<Outlet />}
      <p>userId: {userId}</p>
    </div>
  )
}

function EditUserPage() {
  const { userId } = useParams()
  return (
    <div>
      <h1>Edit User Page</h1>
      <ul>
        <li>
          <NavLink to={'/users/' + userId}>User profile Page</NavLink>
        </li>
        <li>
          <NavLink to={'/users/' + (+userId + 1)}>Another User</NavLink>
        </li>
        <li>
          <NavLink to={'/users/'}>User List Page</NavLink>
        </li>
      </ul>
    </div>
  )
}

function UserListPage() {
  const users = [
    { id: 1, title: 'user 1' },
    { id: 2, title: 'user 2' },
    { id: 3, title: 'user 3' },
    { id: 4, title: 'user 4' },
    { id: 5, title: 'user 5' },
  ]

  return (
    <>
      <h1>User List Page</h1>
      {users.map((user) => (
        <p key={user.id}>
          {user.title}
          <NavLink to={user.id + '/profile'}>Пользователь</NavLink>
        </p>
      ))}
    </>
  )
}

export default App
