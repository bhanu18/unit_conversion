import express from "express";
import { addUnit, addContext, editUnit, getUnit, deleteUnit, queryGet } from "../controller/unitsController.js";

const router = express.Router();

router.post('/add', addUnit);

router.get('/edit/:id', getUnit);

router.put('/:id', editUnit);

router.get('/delete/:id', deleteUnit);

router.post('/addcontext', addContext);

router.get('/get', queryGet);

export default router;
