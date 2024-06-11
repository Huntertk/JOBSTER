import Wrapper from '../assets/wrappers/Dashboard';
import { Outlet } from 'react-router-dom';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import { createContext, useContext, useState } from 'react';
import {checkDefaultTheme} from '../App'
const DashboardContext = createContext();



export const useDashboardContext = () => useContext(DashboardContext)

const DashboardLayout = () => {
  const user = {name:"TAUFIK"}
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
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export default DashboardLayout