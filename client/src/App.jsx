import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    Register,
    Error,
    Landing
} from './pages/index'

import { AddJob, AllJobs, Profile, SharedLayout, Stats } from './pages/dashboard';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer position='top-center' />
      <Routes>
        <Route path='/' element={<SharedLayout />} >
          <Route index element={<Stats />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/profile" element={<Profile />} />

        </Route>
        <Route path='landing' element={<Landing />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App