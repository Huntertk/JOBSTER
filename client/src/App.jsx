import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';

const router = createBrowserRouter([
  {
    path:"/",
    element: <HomeLayout />
  },
  {
    path:"/about",
    element: <h1>About</h1>
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