import { Router } from "express";
import passport from "passport";
import * as TransactionController from "../controllers/TransactionController.js"

const router = Router()

router.get('/',TransactionController.index)

router.post('/', TransactionController.create)


router.delete('/:id', TransactionController.deleteTransaction)


router.patch('/:id',TransactionController.update)

export default router;