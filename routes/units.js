import express from "express";
import { addUnit, addContext, editUnit, getUnit, deleteUnit } from "../controller/unitsController.js";

const router = express.Router();

router.post('/add', addUnit);

router.get('/edit/:id', getUnit);

router.put('/:id', editUnit);

router.get('/delete/:id', deleteUnit);

router.post('/addcontext', addContext);

export default router;
