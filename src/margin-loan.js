/*
 * npm install
 *
 * APIKEY='' APISECRET='' node src/margin.js
 *
 */

const { Spot } = require('binance-connector-node')

const apiKey = process.env.APIKEY || ''
const apiSecret = process.env.APISECRET || ''

const client = new Spot(apiKey, apiSecret)

setInterval(function() {
  console.log('ts:', Date.now())
  client.marginBorrow(
    'BNB',
    0.01
  ).then(response => console.log(response.tranId))
  .catch(error => console.log(error))
}, 500)
