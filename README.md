# Lannister-Pay
NodeJS API service for Lannister Pay

## Getting Started
* Click on the "Clone" button.
* You can decide to download the zip file of the app onto the system or you can clone the repository from the terminal
* If you decide to clone the repository from the terminal, navigate to a directory of your choice on that terminal.
* Using SSH; copy and paste the following below on your terminal `git@github.com:chinemelu/lannister-pay.git`
* Using HTTPS; copy and paste the following below on your terminal `https://github.com/chinemelu/lannister-pay.git`
* Once the folder is cloned onto your computer, cd into the root of the folder and type `npm run install` in the terminal before pressing enter
* To run the program on a development server type `npm start` and press enter 
* To see the development build, go to postman and make a `POST` request to `localhost:3000/fees` with the following `raw` and `JSON` payload
  ```
  {
    "FeeConfigurationSpec": "LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55"
  }
  ```
* After that, make a `POST` endpoint to `localhost:3000/compute-transaction-fee` with the following `raw` and `JSON` payload
  ```
    {
      "ID": 91204,
      "Amount": 3500,
      "Currency": "USD",
      "CurrencyCountry": "US",
      "Customer": {
          "ID": 4211232,
          "EmailAddress": "anonimized292200@anon.io",
          "FullName": "Wenthorth Scoffield",
          "BearsFee": false
      },
      "PaymentEntity": {
          "ID": 2203454,
          "Issuer": "WINTERFELLWALLETS",
          "Brand": "",
          "Number": "200923******0293",
          "SixID": "200923",
          "Type": "WALLET-ID",
          "Country": "NG"
      }
    }
  ```

## Deployment
The steps written below are for Heroku Deployment
* cd into the root folder of the application
* For a first time deployment, type `heroku create app-name` and press enter
* If you are in the application's master branch, you type `git push heroku master` and press enter
* Else, if you are, for example, in a `dev` branch, you type `git push heroku dev:master` and press enter
* The application will then be deployed onto Heroku and the url of the application will be given once the deployment is complete
* For heroku deployment debugging purposes, type `heroku logs --tail` in the terminal
* For subsequent deployments, if changes are made and committed, type `git push heroku branch-name:master -f` in the terminal and press enter
* For more information, see the [Heroku documentation](https://devcenter.heroku.com/articles/git)

## Built With
* [express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
* [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
* [PM2](https://pm2.keymetrics.io/) - PM2 is a production process manager for Node.js applications with a built-in load balancer.

## Authors
* Chinemelu Anthony Nwosu 

