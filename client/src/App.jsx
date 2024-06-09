import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardLayout, Error, HomeLayout, Landing, Login, Register } from './pages';

const router = createBrowserRouter([
  {
    path:"/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children:[
      {
        index: true,
        element: <Landing />
      },
      {
        path:"register",
        element: <Register />
      },
      {
        path:"login",
        element: <Login />
      },
      {
        path:"dashboard",
        element: <DashboardLayout />
      },
    ]
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