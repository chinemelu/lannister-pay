import fcsParser from "../helper/fcsParser.js"
import { determineLocale, getApplicableFeeConfigurationSpec } from "../helper/fee.js"

import { createClient } from "redis" 

const redisPort = process.env.REDIS_PORT
const redisHost = process.env.REDIS_HOSTNAME

export const postFeesController = async (req, res) => {
  try {
    const client = createClient();

    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();

    const unparsedFcsString = req.body.FeeConfigurationSpec


    if (!unparsedFcsString) {
      res.status(400).json({
        message: 'No Fee Configuration Spec',
        statusCode: 400,
      })
      return
    }


    const unparsedFcsArray = unparsedFcsString.split(/\r\n|\r|\n/)


    
      // validate each array and if error, throw
      // save the array to redis if there is no issue

    const parsedFcsArray = unparsedFcsArray.map(arrayElem => fcsParser(arrayElem))
    const objectToSaveToRedis = {
      fcsArray: parsedFcsArray
    }

    await client.json.set('parsedFcsArray', '.', objectToSaveToRedis)

    await client.quit();

    res.status(200).json({
      statusCode: 200,
      status: "ok",
      message: 'Array saved to redis',
      parsedFcsArray
    })
  } catch(error) {
      res.status(500).json({
        error
      })
  }
}

export const computeTransactionFeesController = async (req, res) => {
  try {
    const {
      Currency,
      CurrencyCountry,
      PaymentEntity
    } = req.body

    const CountryOfEntity = PaymentEntity.Country;
  
    const client = createClient();
    
    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    const parsedFcsArray = await client.json.get('parsedFcsArray', {
      path: '.fcsArray'
    })

    await client.quit();

    if (parsedFcsArray) {
      // determine locale
      const locale = determineLocale({ CountryOfEntity, CurrencyCountry })

      const transactionRequestObject = {
        paymentEntityID: PaymentEntity.ID,
        paymentEntityIssue: PaymentEntity.Issuer,
        paymentEntityBrand: PaymentEntity.Brand,
        paymentEntityNumber: PaymentEntity.Number,
        paymentEntitySixID: PaymentEntity.SixID,
        paymentEntityType: PaymentEntity.Type,
        locale,
        Currency,
      }

      const applicableFeeConfigSpec = getApplicableFeeConfigurationSpec({ 
        parsedFcsArray, 
        transactionRequestObject,
      })

      return res.status(200).json({
        applicableFeeConfigSpec
      })
    }

    res.status(404).json({
      statusCode: res.statusCode,
      status: 'error',
      message: 'There is no fee configuration spec'
    })
    
  } catch(error) {
    res.status(500).json({
      error
    })
  }
}