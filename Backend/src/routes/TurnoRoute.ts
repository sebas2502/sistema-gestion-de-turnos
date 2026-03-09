import { Router } from "express";
import { TurnoController } from "../controllers/TurnoController";
import { authenticate } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/rolMiddleware";
import { Request , Response , NextFunction} from "express";

const router = Router();
const controller = new TurnoController();



router.get("/disponibles", authenticate,authorize(['PACIENTE']) , controller.getHorariosDisponibles);
router.post("/reservar",authenticate,authorize(["PACIENTE"]),controller.reservarTurno);
router.get("/misTurnos", authenticate,authorize(['PACIENTE']) , controller.getMisTurnos);

export default router;
