import { createPedido, deletePedido, getPedido, getPedidoNoAceptado, getPedidoUserDate, patchPedido } from "./pedido.controller";
import {Router} from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/', getPedido );

router.get('/usuarios', getPedidoUserDate );

router.get('/enviados', getPedidoNoAceptado );

// Endpoint POST /prueba
router.post('/', createPedido );

// Endpoint PATCH /prueba
router.patch('/', patchPedido );

// Endpoint DELETE /prueba
router.delete('/', deletePedido );

export default router;