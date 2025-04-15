import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { config } from 'dotenv';
import usuarioRouter from './controller/usuarioController';
import productoRouter from './controller/productoController';
import { connectDB } from './config/db';

config();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

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
