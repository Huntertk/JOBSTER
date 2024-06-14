import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
    {
      company: {
        type:String
      },
      position: {
        type:String
      },
      jobStatus: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
      },
      jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship'],
        default: 'full-time',
      },
      jobLocation: {
        type: String,
        default: 'my city',
      },
    },
    { timestamps: true }
  );
  const Job = mongoose.model('Job', JobSchema);
  export default Job;