import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import {FormRow, Logo} from '../components';
import customFetch from '../utils/customFetch';
import toast from 'react-hot-toast';

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success("User Register Successfully")
    return redirect('/login');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg)
    return error;
  }
}

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
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
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>{isSubmitting ? "Processing..." : "register"}</button>
        <p>Already a member ?
          <Link to="/login" className='member-btn'>Login</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register