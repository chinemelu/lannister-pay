import express from 'express'
import dotEnv from 'dotenv'

import { postFeesController } from './controllers/finance.js'

dotEnv.config()

const router = express.Router();

const app = express()

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('Welcome to lannister pay')
})

app.post('/fees', postFeesController)

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Lannister pay running on port ${port}`);
})
