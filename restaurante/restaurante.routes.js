import { createRestaurante, deleteRestaurante, getRestaurante, getRestauranteCatNom, patchRestaurante } from "./restaurante.controller";
import {Router} from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/', getRestaurante );

router.get('/nomcategoria', getRestauranteCatNom );

// Endpoint POST /prueba
router.post('/', createRestaurante );

// Endpoint PATCH /prueba
router.patch('/', patchRestaurante );

// Endpoint DELETE /prueba
router.delete('/', deleteRestaurante );

export default router;