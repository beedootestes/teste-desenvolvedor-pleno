import request from 'supertest'
import app from '../../http/app'
describe('Body Parser Middleware', () => {
  test('Should parse body json', async () => {
    app.post('/test/body_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test/body_parser')
      .send({ name: 'Jobs' })
      .expect({ name: 'Jobs' })
  })
})
