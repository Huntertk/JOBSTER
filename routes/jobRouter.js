import { Router } from "express";
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from "../controllers/jobController.js";
import { validateIdParam, validateJob } from "../middleware/validationMiddleware.js";

const router = Router()


router.get("/", getAllJobs)
router.post("/", validateJob, createJob)
router.get("/:id", validateIdParam, getJob)
router.patch("/:id", validateJob, validateIdParam, updateJob)
router.delete("/:id", validateIdParam, deleteJob)


export default router