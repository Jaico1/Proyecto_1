import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Creacion del app
const app = express();

// Conexión a MongoDB usando mongoose
mongoose
  .connect(
    'mongodb+srv://' +
      process.env.MONGO_USER +
      ':' +
      process.env.MONGO_PASS +
      '@backendp1.mppkxyj.mongodb.net/?',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected.');
  })
  .catch((err) => {
    console.log('There was an error with connection!');
    console.log(err);
  });

// Middlewares
app.use(cors());
app.use(express.json());

import pedidoRoutes from './pedido/pedido.routes'
app.use('/pedido', pedidoRoutes)
import usuarioRoutes from './usuario/usuario.routes'
app.use('/usuario', usuarioRoutes)
import restauranteRoutes from './restaurante/restaurante.routes'
app.use('/restaurante', restauranteRoutes)
import productoRoutes from './producto/producto.routes'
app.use('/producto', productoRoutes)

// Endpoint para 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found.' });
});

// Inicia app en puerto 8080
app.listen(8080);
