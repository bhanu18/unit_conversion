import express from "express";
import { addSystem, deleteSystem, editSystem, getSystem } from "../controller/systemController.js";

const router = express.Router();

router.post('/add', addSystem);

router.get('/edit/:id', getSystem );

router.put('/:id', editSystem);

router.get('/delete/:id', deleteSystem);

export default router;