import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Link } from 'react-router-dom'
import {FormRow, Logo} from '../components';

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow 
          type={"text"}
          labelText={"first name"}
          name={"name"}
          defaultValue={"MD"}
        />
        <FormRow 
          type={"text"}
          name={"lastName"}
          labelText={"Last Name"}
          defaultValue={"TAUFIK"}
        />
        <FormRow 
          type={"text"}
          name={"location"}
          labelText={"location"}
          defaultValue={"India"}
        />
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
        <button type='button' className='btn btn-block'>explore app</button>
        <p>Already a member ?
          <Link to="/login" className='member-btn'>Login</Link>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register