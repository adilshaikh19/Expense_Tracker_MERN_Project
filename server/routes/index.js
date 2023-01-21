import { Router } from "express";
import TransactionRoute from './TransactionRoute.js'
import AuthRoute from './AuthRoute.js'
import UserRoute from './UserRoute.js'
import passport from "passport";
import CategoryRoute from "./CategoryRoute.js"


const router = Router()

const auth = passport.authenticate("jwt",{session:false})

router.use('/transaction',auth,TransactionRoute)
router.use('/auth',AuthRoute);
router.use('/user',UserRoute)
router.use('/category',auth,CategoryRoute)

export default router