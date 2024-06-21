import Wrapper from '../assets/wrappers/Dashboard';
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import { createContext, useContext, useState } from 'react';
import {checkDefaultTheme} from '../App'
import customFetch from '../utils/customFetch';
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
    console.log("Logout User");
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