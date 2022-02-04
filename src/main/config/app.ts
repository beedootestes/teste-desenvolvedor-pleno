import express from 'express'
import setupMiddleawares from './middlewares'

const app = express()
setupMiddleawares(app)

export default app
