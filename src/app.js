import express from 'express'
import dotEnv from 'dotenv'

import { postFeesController, computeTransactionFeesController } from './controllers/fee.js'
import { computeTransactionFeesValidationMiddleware } from './middleware/validation.js'
import trimStringRequestValues from './middleware/trimString.js'
import validateFcs from './middleware/validateFcs.js'

dotEnv.config()

const app = express()

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('Welcome to lannister pay')
})

app.post(
  '/fees', 
  validateFcs,
  postFeesController
)

app.post(
  '/compute-transaction-fee', 
  computeTransactionFeesValidationMiddleware, 
  trimStringRequestValues, 
  computeTransactionFeesController
)

app.use((req, res) => {
  res.status(404).json({
    message: 'This page is not available'
  });
});

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Lannister pay running on port ${port}`);
})
