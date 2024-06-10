import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Link } from 'react-router-dom'
import {FormRow, Logo} from '../components';

const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow 
          type={"email"}
          name={"email"}
          labelText={"email"}
          defaultValue={"test@email.com"}
        />
        <FormRow 
          type={"password"}
          name={"password"}
          labelText={"password"}
          defaultValue={"password"}
        />
        <button type='submit' className='btn btn-block'>submit</button>
        <p>Not a member yet ?
          <Link to="/register" className='member-btn'>Register</Link>
        </p>
      </form>
    </Wrapper>
  )
}

export default Login