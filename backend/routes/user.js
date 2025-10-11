import { Router } from 'express'
import UserController from '../controller/user.js'

const userRouter = Router()

const userController = new UserController()

userRouter.post('/login', userController.login)
userRouter.get('/verify', userController.linkLogin)

export default userRouter
