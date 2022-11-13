import express from "express";
import { add, deletePair, edit, get, getPair } from "../controller/pairsController.js";

const router = express.Router();

router.post('/add', add);

router.get('/edit/:id', get);

router.put('/:id', edit);

router.get('/delete/:id', deletePair);

router.get('/get', getPair);

export default router;