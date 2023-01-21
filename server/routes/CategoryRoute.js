import {Router} from "express"
import passport from "passport"
import * as CategoryController from "../controllers/CategoryController.js"

const router = Router()

router.delete("/:id", CategoryController.destroy);
router.post("/", CategoryController.create)


export default router
    