import { EspecialidadService } from "../services/EspecialidadService"
import { Request , Response } from "express";


export class EspecialidadController{
    
    private especialidadService = new EspecialidadService();
    
    getEspecialidades = async (req:Request , res:Response) => {
        try {
        

        const especialidades = await this.especialidadService.getEspecialidades();

        res.json(especialidades);
        } catch (error : any) {
            if (error as Error){
                res.json({error:error.message})
            }            
        }
    }
    
}