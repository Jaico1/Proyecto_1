import { createUsuario, deleteUsuario, getUsuario, patchUsuario } from "./usuario.controller";
import {Router} from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/', getUsuario);

// Endpoint POST /prueba
router.post('/', createUsuario );

// Endpoint PATCH /prueba
router.patch('/', patchUsuario );

// Endpoint DELETE /prueba
router.delete('/', deleteUsuario );

export default router;