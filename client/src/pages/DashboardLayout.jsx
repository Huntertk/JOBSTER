import Wrapper from '../assets/wrappers/Dashboard';
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import { createContext, useContext, useState } from 'react';
import {checkDefaultTheme} from '../App'
import customFetch from '../utils/customFetch';
import toast from 'react-hot-toast';
const DashboardContext = createContext();


export const loader = async () => {
  try {
    const {data} = await customFetch.get('/users/current-user')
    return data;
  } catch (error) {
    return redirect('/');
  }
} 

export const useDashboardContext = () => useContext(DashboardContext)


const DashboardLayout = () => {
  const navigate = useNavigate();
  const {user} = useLoaderData();
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())
  

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme((newDarkTheme));
    document.body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

  const toggleSidebar = () => {
    console.log("Sidebar toggle");
    setShowSidebar((prev) => !prev)
  }

  const logoutUser = async () => {
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
    navigate('/');
  }
  
  return (
    <DashboardContext.Provider value={{
      user,
      showSidebar,
      isDarkTheme,
      toggleDarkTheme,
      toggleSidebar,
      logoutUser
    }}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet 
              context={{
                user
              }} 
              />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export default DashboardLayout