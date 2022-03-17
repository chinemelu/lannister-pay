import express from 'express'
import dotEnv from 'dotenv'

import { postFeesController, computeTransactionFeesController } from './controllers/fee.js'
import { computeTransactionFeesValidationController } from './controllers/validation.js'
import trimStringRequestValues from './controllers/trimString.js'

dotEnv.config()

const app = express()

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('Welcome to lannister pay')
})

app.post('/fees', postFeesController)
app.post(
  '/compute-transaction-fee', 
  computeTransactionFeesValidationController, 
  trimStringRequestValues, 
  computeTransactionFeesController
)

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Lannister pay running on port ${port}`);
})
