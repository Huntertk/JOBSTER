import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import {FormRow, Logo} from '../components';
import customFetch from '../utils/customFetch';

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    return redirect('/login');
  } catch (error) {
    console.log(error);
    return error;
  }
}

const Register = () => {
  return (
    <Wrapper>
      <Form method='POST' className="form">
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
        <p>Already a member ?
          <Link to="/login" className='member-btn'>Login</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register