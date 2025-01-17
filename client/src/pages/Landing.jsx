import Wrapper from "../assets/wrappers/LandingPage";
import main from '../assets/images/main.svg';
import { Link } from "react-router-dom";
import { Logo } from "../components";



const Landing = () => {
  return (
    <Wrapper>
      <nav>
       <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>job <span>tracking</span> app</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione cupiditate laboriosam aliquam error ea. Debitis, doloribus odit provident voluptatibus et esse iste voluptates repellendus molestias culpa molestiae necessitatibus possimus in.</p>
          <Link to="/register" className="btn register-link">Register</Link>
          <Link to="/login" className="btn">Login / demo</Link>
        </div>
        <img src={main} alt="Jobify" className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing