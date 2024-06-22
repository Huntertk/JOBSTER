import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect, useOutletContext } from 'react-router-dom';
import toast  from 'react-hot-toast';
import customFetch from '../utils/customFetch';
import {FormRowSelect} from '../components';

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/jobs', data);
    toast.success("Job Added Successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.success(error?.response?.data?.msg);
    return error;
  }
}

const AddJob = () => {
  const {user} = useOutletContext();
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
              <FormRowSelect
              defaultValue={JOB_STATUS.PENDING}
              labelText={"Job Status"}
              name={"jobStatus"}
              list={Object.values(JOB_STATUS)}
              />
              <FormRowSelect
              defaultValue={JOB_TYPE.FULL_TIME}
              labelText={"Job Type"}
              name={"jobType"}
              list={Object.values(JOB_TYPE)}
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