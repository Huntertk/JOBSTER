import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardLayout, HomeLayout, Login, Register } from './pages';

const router = createBrowserRouter([
  {
    path:"/",
    element: <HomeLayout />
  },
  {
    path:"/register",
    element: <Register />
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/dashboard",
    element: <DashboardLayout />
  },
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App