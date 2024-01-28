import React from 'react'

import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo} from '../components/index'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo />
        </nav>
        <div className="container page">
            {/*Info */}
            <div className="info">
                <h1>
                job <span>Tracking</span> app
                </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta necessitatibus vero labore aut earum nesciunt hic vitae quae veniam nemo.</p>
                <Link to="/register" className="btn btn-hero">Login/Register</Link>
            </div>
            <img src={main} alt="main image" className='img main-img' />
        </div>
    </Wrapper>
  )
}

export default Landing