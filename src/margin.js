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

let i = 0

setInterval(function() {
  console.log(i)
  client.marginAccount().then(response => console.log('success'))
  .catch(error => console.log(error))
  i = i +1
}, 300)
