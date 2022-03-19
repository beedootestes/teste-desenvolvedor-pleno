import express from 'express'
import setupMiddleWares from './set-middlewares'
import setupRouts from './set-routes'

const app = express()
setupMiddleWares(app)
setupRouts(app)

export default app
