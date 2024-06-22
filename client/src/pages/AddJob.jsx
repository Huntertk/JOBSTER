import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect, useOutletContext } from 'react-router-dom';
import toast  from 'react-hot-toast';
import customFetch from '../utils/customFetch';

const AddJob = () => {
  const {user} = useOutletContext();
  console.log(user);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'
  
  return (
    <Wrapper>
      <Form method='POST' className='form'>
          <h4 className='form-title'>Add Job</h4>
          <div className="form-center">
            <FormRow 
              type={"text"}
              name={"position"}
              labelText={"position"}
              />
            <FormRow 
              type={"text"}
              name={"company"}
              labelText={"company"}
              />
            <FormRow 
              type={"text"}
              name={"jobLocation"}
              labelText={"job location"}
              defaultValue={user.location}
              />
              <button 
              type="submit" 
              className='btn btn-block form-btn' 
              disabled={isSubmitting}>
                {isSubmitting ? "Processing...." : "Add Job" }
              </button>
          </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob