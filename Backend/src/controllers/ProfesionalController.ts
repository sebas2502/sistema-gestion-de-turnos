import { ProfesionalService } from "../services/ProfesionalService"
import { Request , Response } from "express";


export class ProfesionalController{
    
    private profesionalService = new ProfesionalService();
    
   getProfesionales = async (req: Request, res: Response) => {
    try {
      const { especialidadId } = req.query;
      

          
      const profesionales =
        await this.profesionalService.getProfesionales(
          especialidadId ? Number(especialidadId) : undefined
        );
        

      res.json(profesionales);

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
    
}