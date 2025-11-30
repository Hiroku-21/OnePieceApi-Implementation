import express from 'express';
import onePieceRoutes from './routes/onePiece.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use('/api', onePieceRoutes);

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
