import express from "express";
import cors from "cors";
import "reflect-metadata";
import  turnoRouter  from "./routes/TurnoRoute";
import especialidadRouter from "./routes/EspecialidadRoute";
import profesionalRouter from "./routes/ProfesionalRoute";
import authRouter from "./routes/AuthRoute";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{res.send({message:"Hola"})});
app.use('/api/turnos' , turnoRouter);
app.use('/api/especialidades' , especialidadRouter);
app.use('/api/profesionales' , profesionalRouter);
app.use('/api/auth' , authRouter);

export default app;
