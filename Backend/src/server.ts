import app from "./app";
import dotenv from "dotenv";
import { AppDataSource } from "./config/dataSource";

dotenv.config();

const PORT = Number(process.env.PORT || 3001);

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Base de datos conectada");

    app.listen(PORT, '0.0.0.0' ,() => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar la base de datos", error);
  });
