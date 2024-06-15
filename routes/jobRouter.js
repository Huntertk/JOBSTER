import { Router } from "express";
import {createJob,deleteJob,getAllJobs,getJob,updateJob} from '../controllers/jobController.js'
import { validateJobInput } from "../middleware/validationMiddleware.js";

const router  = Router();

router.route('/')
    .get(getAllJobs)
    .post(validateJobInput, createJob)

router.route('/:id')
    .get(getJob)
    .patch(validateJobInput, updateJob)
    .delete(deleteJob)

export default router;