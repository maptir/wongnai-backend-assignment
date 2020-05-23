import express from 'express'
import logger from 'morgan'
import { Sequelize } from 'sequelize-typescript'

import reviewsRouter from './routes/reviews'

const app = express()
const port = process.env.TEST_SERVER_PORT || 8080

app.use(express.json())
app.use(logger('dev'))

const sequelize = new Sequelize({
  database: 'Wongnai',
  dialect: 'mysql',
  username: 'root',
  host: 'test-db',
  port: 3306,
  models: [__dirname + '/models'],
  define: {
    timestamps: false,
  },
})

app.use('/reviews', reviewsRouter)

app.listen(port, () => {
  console.log('Server started at port', port)
})

export default app
