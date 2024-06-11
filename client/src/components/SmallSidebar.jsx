import { FaTimes } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/SmallSidebar';
import { useDashboardContext } from '../pages/DashboardLayout';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';

const SmallSidebar = () => {
  const data = useDashboardContext();

  return (
    <Wrapper>
      <div className='sidebar-container show-sidebar'>
        <div className="content">
          <button type="button" className='close-btn'>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            {links.map((link, i) => {
              const {text, path, icon} = link
              return <NavLink to={path} key={i} className={'nav-link'}>
                <span className='icon'>
                  {icon}
                </span>
                 {text}
              </NavLink>
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar