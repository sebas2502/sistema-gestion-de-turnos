import { Request, Response } from "express";
import { TurnoService } from "../services/TurnoService";


export class TurnoController {

  private turnoService = new TurnoService();

  // GET /turnos/disponibles?profesionalId=1&fecha=2026-03-01
  getHorariosDisponibles = async (req: Request, res: Response) => {
    try {
      const { profesionalId, fecha } = req.query;

     console.log("profesionalId recibido:", profesionalId);

      if (!profesionalId || !fecha) {
        return res.status(400).json({
          message: "Faltan parámetros requeridos"
        });
      }

      const horarios =
        await this.turnoService.getHorariosDisponibles(
          Number(profesionalId),
          String(fecha)
        );

      
      return res.json(horarios);

    } catch (error: any) {
      return res.status(500).json({
        message: error.message
      });
    }
  };


  getMisTurnos = async (req: Request, res: Response) => {

  try {
    
    const pacienteId = Number(req.user?.id);
  
    const turnos = await this.turnoService.getMisTurnos(pacienteId);
  
    res.json(turnos);

  } catch (error : any) {

  

    res.status(500).json({
      message: "Error al obtener turnos"
      
    });

  }

}


reservarTurno = async (req: Request & {user?:{id:number,rol:string}}, res: Response) => {
  try {
    const { profesionalId, fecha, hora } = req.body;
    const pacienteId = req.user?.id;
    console.log("paciente: ",pacienteId)
  
    if (!pacienteId) {
    return res.status(401).json({ message: "Usuario no autenticado" });
}

    const turno = await this.turnoService.reservarTurno(
      pacienteId,
      profesionalId,
      fecha,
      hora
    );
    

    res.status(201).json(turno);

  } catch (error: any) {

    res.status(400).json({ error: error.message });
  }
};

vistaProtegida = async (req:Request , res:Response) => {
  try {
    const { profesionalId, fecha, hora } = req.body;
    const pacienteId = req.user?.id;

    if (!pacienteId) {
    return res.status(401).json({ message: "Usuario no autenticado" });
}

   
res.status(200).json({info:"test info"})
  

  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
 
getAgendaProfesional = async (req: Request, res: Response) => {
  const { profesionalId, fecha } = req.query;

  const agenda = await this.turnoService.getAgendaProfesional(
    Number(profesionalId),
    String(fecha)
  );

  res.json(agenda);
};

 
}