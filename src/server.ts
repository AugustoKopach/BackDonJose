import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import { config } from 'dotenv';
import usuarioRouter from './controller/usuarioController';
import productoRouter from './controller/productoController';
import { connectDB } from './config/db';

config();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(helmet());
app.use(bodyParser.json());

// Hacer pública la carpeta de imágenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', usuarioRouter);
app.use('/api', productoRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'API Ferretería funcionando 🚀' });
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`✅ Servidor escuchando en puerto ${port}`);
  });
}).catch((err) => {
  console.error('❌ Error al iniciar el servidor:', err);
});
