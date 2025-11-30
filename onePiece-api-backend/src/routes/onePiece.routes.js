import express from "express";
import {getCharacters, getCharacterById} from "../controllers/onePiece.controller.js";

const router = express.Router();

router.get('/characters', getCharacters);
router.get('/characters/:id', getCharacterById);

export default router;