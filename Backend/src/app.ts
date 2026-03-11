import express from "express";
import cors from "cors";
import "reflect-metadata";
import  turnoRouter  from "./routes/TurnoRoute";
import especialidadRouter from "./routes/EspecialidadRoute";
import profesionalRouter from "./routes/ProfesionalRoute";
import authRouter from "./routes/AuthRoute";
import disponibilidadRouter from "./routes/DisponibilidadRoute";

const app = express();

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173",
    "http://192.168.100.17:5173"],
    credentials: true
  }))

app.get('/',(req,res)=>{res.send({message:"Hola"})});
app.use('/api/turnos' , turnoRouter);
app.use('/api/especialidades' , especialidadRouter);
app.use('/api/profesionales' , profesionalRouter);
app.use("/api/disponibilidad", disponibilidadRouter);
app.use('/api/auth' , authRouter);

export default app;
