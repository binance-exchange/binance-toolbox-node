const { Spot } = require('binance-connector-node')

const apiKey = process.env.APIKEY || ''
const apiSecret = process.env.APISECRET || ''

const client = new Spot(apiKey, apiSecret, {
  baseURL: 'https://testnet.binance.vision' // this is for testnet, working on production by default
})

client.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
  price: 15.01,
  quantity: 1,
  timeInForce: 'GTC'
}).then(response => console.log(JSON.stringify(response.data)))
  .catch(error => console.log(error))
