import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { 
  AddJob, 
  Admin, 
  AllJobs, 
  DashboardLayout, 
  Error, 
  HomeLayout, 
  Landing, 
  Login, 
  Profile, 
  Register, 
  Stats,
  EditJob
} from './pages';

import {action as registerAction} from './pages/Register'
import {action as loginAction} from './pages/Login'
import {action as addJobAction} from './pages/AddJob'

import {loader as dashboardLoader} from './pages/DashboardLayout'
import {loader as allJobsLoader} from './pages/AllJobs'

export const checkDefaultTheme = () => {
  const isDarkTheme =  localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme;
}
checkDefaultTheme();


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
        element: <Register />,
        action: registerAction,
      },
      {
        path:"login",
        element: <Login />,
        action:loginAction
      },
      {
        path:"dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children:[
          {
            index: true,
            element: <AddJob />,
            action: addJobAction
          },
          {
            path:"stats",
            element: <Stats />
          },
          {
            path:"all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader
          },
          {
            path:"profile",
            element: <Profile />
          },
          {
            path:"admin",
            element: <Admin />
          },
          {
            path:'edit-job/:id',
            element:<EditJob />,

          }
        ]
      },
    ]
  },
 
])

const App = () => {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App