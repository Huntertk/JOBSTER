import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import {FormRow, Logo} from '../components';
import customFetch from '../utils/customFetch';
import toast from 'react-hot-toast';

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    toast.success("User login Successfully")
    return redirect('/dashboard');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg)
    return error;
  }
}

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='POST' className="form">
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
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>{isSubmitting ? "Processing..." : "Login"}</button>
        <p>Not a member yet ?
          <Link to="/register" className='member-btn'>Register</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login