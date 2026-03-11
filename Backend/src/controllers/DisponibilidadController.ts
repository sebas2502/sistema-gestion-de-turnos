import { Request, Response } from "express";
import { DisponibilidadService } from "../services/DisponibilidadService";

export class DisponibilidadController {

  private service = new DisponibilidadService();

  obtenerDisponibilidades = async (req: Request, res: Response) => {

    try {

      const usuarioId = Number(req.user?.id);

      const disponibilidades =
        await this.service.obtenerDisponibilidades(usuarioId);

      res.json(disponibilidades);

    } catch (error: any) {

      res.status(400).json({ message: error.message });

    }

  };

  crearDisponibilidad = async (req: Request, res: Response) => {

    try {

      const usuarioId = Number(req.user?.id);

      const disponibilidad =
        await this.service.crearDisponibilidad(usuarioId, req.body);

      res.json(disponibilidad);

    } catch (error: any) {

      res.status(400).json({ message: error.message });

    }

  };

  eliminarDisponibilidad = async (req: Request, res: Response) => {

    try {

      await this.service.eliminarDisponibilidad(
        Number(req.params.id)
      );

      res.json({ message: "Disponibilidad eliminada" });

    } catch (error: any) {

      res.status(400).json({ message: error.message });

    }

  };

}