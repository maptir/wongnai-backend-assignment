import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import './db'

import reviewsRouter from './routes/reviews'

const app = express()
const port = 8080

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.use('/reviews', reviewsRouter)

app.listen(port, () => {
  console.log('Server started at port', port)
})

export default app
