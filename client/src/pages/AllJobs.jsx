import React from 'react'
import { redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import toast from 'react-hot-toast';
import { JobsContainer, SearchContainer } from '../components';

export const loader = async () => {
  try {
    const {data} = await customFetch.get('/jobs')
    return {data};
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error;
  }
}

const AllJobs = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  )
}

export default AllJobs