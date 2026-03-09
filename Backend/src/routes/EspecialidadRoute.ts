import express from "express";
import { EspecialidadController } from "../controllers/EspecialidadController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/rolMiddleware";

const router = express.Router();
const espController = new EspecialidadController();

router.get('/' , authenticate,authorize(['PACIENTE']) , espController.getEspecialidades);

export default router;
