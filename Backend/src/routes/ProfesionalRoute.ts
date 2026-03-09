import express from "express";
import { ProfesionalController } from "../controllers/ProfesionalController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/rolMiddleware";

const router = express.Router();
const espController = new ProfesionalController();

router.get('/' , authenticate , authorize(['PACIENTE']) , espController.getProfesionales);

export default router;
