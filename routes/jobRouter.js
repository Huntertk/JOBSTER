import { Router } from "express";
import {createJob,deleteJob,getAllJobs,getJob,updateJob} from '../controllers/jobController.js'
import { validateJobInput, validateIdParam, validateOwner } from "../middleware/validationMiddleware.js";

const router  = Router();

router.route('/')
    .get(getAllJobs)
    .post(validateJobInput, createJob)

router.route('/:id')
    .get(validateIdParam, validateOwner, getJob)
    .patch(validateIdParam, validateJobInput, updateJob)
    .delete(validateIdParam, deleteJob)

export default router;