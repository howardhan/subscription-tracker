import { Router } from 'express'
import { getUsers, getUser } from '../controllers/user.controller.js'
import authorize from '../middlewares/auth.middleware.js'

const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', authorize, getUser) // TODO 2025/9/12 2:01:00
userRouter.post('/', (req, res) => res.send({ title: 'create new user' }))
userRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE user' }))
userRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE user' }))
export default userRouter
