import { Router } from "express";
import { DisponibilidadController } from "../controllers/DisponibilidadController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/rolMiddleware";

const router = Router();
const controller = new DisponibilidadController();

router.get("/", authenticate,authorize(['PROFESIONAL']),controller.obtenerDisponibilidades);
router.post("/", authenticate,authorize(['PROFESIONAL']),controller.crearDisponibilidad);
router.delete("/:id", authenticate,authorize(['PROFESIONAL']),controller.eliminarDisponibilidad);

export default router;