import express from 'express'
import setupMiddleawares from './middlewares'
import setupRoutes from './routes'

const app = express()
setupMiddleawares(app)
setupRoutes(app)
export default app
