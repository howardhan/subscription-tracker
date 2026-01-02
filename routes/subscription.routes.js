import { Router } from 'express'
import authorize from '../middlewares/auth.middleware.js'
import {
  createSubscription,
  getUserSubscriptions,
} from '../controllers/subscription.controller.js'
const subscriptionRouter = Router()
subscriptionRouter.get('/', (req, res) =>
  res.send({ title: 'get all subscriptions' })
)
subscriptionRouter.get('/:id', (req, res) =>
  res.send({ title: 'get subscription detail' })
)
subscriptionRouter.post('/', authorize, createSubscription)
subscriptionRouter.put('/:id', (req, res) =>
  res.send({ title: 'update subscription' })
)
subscriptionRouter.delete('/:id', (req, res) =>
  res.send({ title: 'delete subscription' })
)
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions) // TODO2025/9/22 2:20:49
subscriptionRouter.put('/:id/cancel', (req, res) =>
  res.send({ title: 'cancel subscription' })
)
subscriptionRouter.get('/upcoming-renewals', (req, res) =>
  res.send({ title: 'get upcoming renewals' })
)
export default subscriptionRouter
